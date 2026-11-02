import { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'peerjs';

export function usePeerGame(role) {
  const [peerId, setPeerId] = useState('');
  const [connections, setConnections] = useState({});
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('LOBBY');
  const [currentData, setCurrentData] = useState(null);
  const [playerStatus, setPlayerStatus] = useState({ joined: false, score: 0 });

  const peerRef = useRef(null);
  const connectionsRef = useRef({});
  const playersRef = useRef([]);

  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    if (role === 'host') {
      const code = Math.random().toString(36).substring(2, 6).toUpperCase();
      const peer = new Peer(`divequest-${code}`);

      peer.on('open', () => setPeerId(code));

      peer.on('connection', (conn) => {
        connectionsRef.current[conn.peer] = conn;
        setConnections({ ...connectionsRef.current });

        conn.on('data', (data) => {
          if (data.type === 'JOIN_GAME') {
            const updated = [...playersRef.current, { id: conn.peer, name: data.name, score: 0 }];
            setPlayers(updated);
            Object.values(connectionsRef.current).forEach((c) => {
              if (c.open) c.send({ type: 'PLAYER_LIST', players: updated });
            });
          }
        });

        conn.on('close', () => {
          delete connectionsRef.current[conn.peer];
          setConnections({ ...connectionsRef.current });
          setPlayers((prev) => prev.filter((p) => p.id !== conn.peer));
        });
      });

      peerRef.current = peer;
      return () => peer.destroy();
    }
  }, [role]);

  const joinRoom = useCallback((code, playerName) => {
    const peer = new Peer();
    peer.on('open', () => {
      const conn = peer.connect(`divequest-${code.toUpperCase()}`);

      conn.on('open', () => {
        peerRef.current = peer;
        connectionsRef.current['host'] = conn;
        setPlayerStatus({ joined: true, score: 0 });
        conn.send({ type: 'JOIN_GAME', name: playerName });
      });

      conn.on('data', (data) => {
        if (data.type === 'PLAYER_LIST') {
          // Player tracking if needed
        }
      });
    });
  }, []);

  return {
    peerId,
    players,
    gameState,
    playerStatus,
    joinRoom,
  };
}


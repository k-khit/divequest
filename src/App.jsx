import React, { useState } from 'react';
import { usePeerGame } from './hooks/usePeerGame';
import { HostDashboard } from './components/host/HostDashboard';
import { PlayerDashboard } from './components/player/PlayerDashboard';

export default function App() {
  const [role, setRole] = useState(null);

  const hostGame = usePeerGame('host');
  const playerGame = usePeerGame('player');

  if (!role) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-6">
        <h1 className="text-4xl font-black tracking-tight text-cyan-400">DiveQuest Lobby</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setRole('host')}
            className="bg-cyan-600 hover:bg-cyan-700 font-bold px-8 py-4 rounded-2xl shadow-lg text-lg transition"
          >
            I am the Host (Laptop)
          </button>
          <button 
            onClick={() => setRole('player')}
            className="bg-emerald-600 hover:bg-emerald-700 font-bold px-8 py-4 rounded-2xl shadow-lg text-lg transition"
          >
            I am a Player (Mobile)
          </button>
        </div>
      </div>
    );
  }

  if (role === 'host') {
    return <HostDashboard roomCode={hostGame.peerId} players={hostGame.players} />;
  }

  return <PlayerDashboard playerStatus={playerGame.playerStatus} onJoin={playerGame.joinRoom} />;
}


import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';

export function PlayerDashboard({ playerStatus, onJoin }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  if (!playerStatus.joined) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center px-6">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 max-w-md mx-auto w-full">
          <div className="text-center space-y-2">
            <Smartphone className="w-12 h-12 mx-auto text-cyan-400" />
            <h1 className="text-3xl font-black">Join DiveQuest</h1>
          </div>
          <div className="space-y-4">
            <input 
              type="text"
              placeholder="Room Code (4 chars)"
              maxLength={4}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center text-xl font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input 
              type="text"
              placeholder="Your Nickname"
              maxLength={12}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button 
              onClick={() => onJoin(code, name)}
              disabled={!code || !name}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-slate-950 font-black text-lg py-4 rounded-xl shadow-lg transition"
            >
              ENTER LOBBY
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h2 className="text-3xl font-black text-cyan-400">You're In!</h2>
      <p className="text-slate-400">Watch the main host screen for the game to begin.</p>
    </div>
  );
}

import React from 'react';
import { Users } from 'lucide-react';

export function HostDashboard({ roomCode, players }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-6">
      <header className="flex justify-between items-center bg-slate-800 px-6 py-4 rounded-xl shadow-lg border border-slate-700">
        <div className="flex items-center space-x-3">
          <span className="bg-cyan-600 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full">Host Room</span>
          <h1 className="text-2xl font-black tracking-wider text-cyan-400">ROOM CODE: {roomCode || 'Generating...'}</h1>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
          <Users className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-lg">{players.length} Players Connected</span>
        </div>
      </header>

      <main className="flex-1 my-6 flex flex-col items-center justify-center">
        {players.length === 0 ? (
          <div className="text-center space-y-4 animate-pulse">
            <h2 className="text-4xl font-extrabold text-slate-300">Waiting for players to join...</h2>
            <p className="text-slate-500 text-lg">Enter room code <span className="text-cyan-400 font-bold">{roomCode}</span> on mobile</p>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">Connected Divers:</h3>
            <div className="grid grid-cols-2 gap-3">
              {players.map((p) => (
                <div key={p.id} className="bg-slate-900 p-3 rounded-xl border border-slate-700 font-bold text-center">
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

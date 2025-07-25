'use client';
import { useEffect, useState } from 'react';

export default function Manager() {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    fetch('/api/bots/manager')
      .then(res => res.json())
      .then(data => setBots(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bot Manager</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Bot</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {bots.map((bot, i) => (
            <tr key={i}>
              <td className="p-2 border">{bot.name}</td>
              <td className="p-2 border">{bot.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

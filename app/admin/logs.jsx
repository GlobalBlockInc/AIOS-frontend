'use client';
import { useEffect, useState } from 'react';

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/admin/logs')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">System Logs</h1>
      <div className="bg-black text-white p-4 rounded h-96 overflow-y-auto">
        {logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  );
}

// AIOS-frontend/app/admin/logs.jsx
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function LogsViewer() {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    fetch('/api/admin/logs')
      .then(res => res.text())
      .then(setLogs);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Bot Logs (Last 200 lines)</h2>
          <pre className="bg-black text-green-500 p-4 rounded text-sm whitespace-pre-wrap overflow-auto h-[500px]">
            {logs || 'Loading logs...'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
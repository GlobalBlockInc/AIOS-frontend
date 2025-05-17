// AIOS-frontend/app/admin/dashboard.jsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminDashboard() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const sendCommand = async (cmd) => {
    setLoading(true);
    const res = await fetch('/api/bots/manager', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: cmd })
    });
    const data = await res.json();
    setStatus(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">System Controls</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => sendCommand('restart core')}>Restart Core</Button>
            <Button onClick={() => sendCommand('check ai chat')}>Check AI Chat</Button>
            <Button onClick={() => sendCommand('status')}>Status</Button>
          </div>
          <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
            {loading ? 'Running...' : status || 'No output yet.'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
// AIOS-frontend/app/admin/manager.jsx
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ManagerPanel() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/bots/manager', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: input })
    });
    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">ManagerBot Command Console</h2>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Type a command (e.g., check ai chat)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Running...' : 'Submit'}
          </Button>
          <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
            {response || 'No output yet.'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
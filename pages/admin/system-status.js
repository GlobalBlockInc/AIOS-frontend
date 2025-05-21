import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SystemStatus() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const pass = localStorage.getItem('admin_auth');
    if (pass !== process.env.NEXT_PUBLIC_ADMIN_SECRET) router.push('/admin/login');

    fetch('/api/admin/logs')
      .then(res => res.json())
      .then(data => setLogs(data.logs));
  }, []);

  const handleAsk = async () => {
    const res = await fetch('/api/admin/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>System Status</h1>
      <pre style={{ background: '#111', color: '#0f0', padding: '1rem' }}>
        {logs.join('\n')}
      </pre>

      <h3>Ask the AI:</h3>
      <input
        style={{ width: '100%' }}
        placeholder="What broke today?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAsk}>Ask</button>
      <p>{response}</p>
    </div>
  );
}

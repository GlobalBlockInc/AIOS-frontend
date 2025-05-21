import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SystemStatus() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [authPassed, setAuthPassed] = useState(false);

  useEffect(() => {
    const pass = localStorage.getItem('admin_auth');
    if (pass !== 'letmein123') {
      router.push('/admin/login');
    } else {
      setAuthPassed(true);
      fetchLogs();
    }
  }, []);

  const fetchLogs = async () => {
    const res = await fetch('/api/admin/logs');
    const data = await res.json();
    setLogs(data.logs);
  };

  const handleAsk = async () => {
    const res = await fetch('/api/admin/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
    setInput('');
    fetchLogs();
  };

  const runBot = async (bot) => {
    const res = await fetch('/api/admin/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bot })
    });
    const data = await res.json();
    alert(data.output || '✅ Bot triggered successfully.');
    fetchLogs();
  };

  if (!authPassed) return null;

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🧠 AIOS System Status</h1>

      <h3>🔍 Recent Logs</h3>
      <pre style={{ background: '#111', color: '#0f0', padding: '1rem', maxHeight: '300px', overflowY: 'scroll' }}>
        {logs.join('\n')}
      </pre>

      <h3>💬 Ask the AI Assistant</h3>
      <input
        style={{ width: '100%', marginBottom: '0.5rem' }}
        placeholder="e.g. What failed today? or Run testbot"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAsk}>Ask</button>
      <p style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{response}</p>

      <h3>🛠 Manual Bot Controls</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {['techbot', 'testbot', 'managerbot', 'codegenbot', 'restartFrontend'].map((bot) => (
          <button
            key={bot}
            onClick={() => runBot(bot)}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            {bot === 'restartFrontend' ? '🔁 Restart Frontend' : `▶️ Run ${bot}`}
          </button>
        ))}
      </div>
    </div>
  );
}


import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [authPassed, setAuthPassed] = useState(false);

  useEffect(() => {
    const pass = localStorage.getItem('admin_auth');
    if (pass !== 'letmein123') router.push('/admin/login');
    else {
      setAuthPassed(true);
      fetchLogs();
      const interval = setInterval(fetchLogs, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  const fetchLogs = async () => {
    const res = await fetch('/api/admin/stream-logs');
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
  };

  const runPipeline = async () => {
    const res = await fetch('/api/admin/pipeline');
    const data = await res.json();
    alert(data.output.join('\n'));
  };

  if (!authPassed) return null;

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🧠 AIOS Admin Dashboard</h1>

      <h3>📡 Live Bot Logs</h3>
      <pre style={{ background: '#111', color: '#0f0', padding: '1rem', maxHeight: '300px', overflowY: 'scroll' }}>
        {logs.join('\n')}
      </pre>

      <h3>💬 Ask AI (with HTML rendering)</h3>
      <input
        style={{ width: '100%', marginBottom: '0.5rem' }}
        placeholder="e.g. What failed today? or Run testbot"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAsk}>Ask</button>
      <div
        style={{ marginTop: '1rem', background: '#eee', padding: '1rem' }}
        dangerouslySetInnerHTML={{ __html: response }}
      />

      <h3>🛠 Manual Controls</h3>
      <button onClick={runPipeline}>⚙️ Run Full Repair Chain</button>
    </div>
  );
}

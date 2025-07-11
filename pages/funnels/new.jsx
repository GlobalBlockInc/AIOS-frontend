import { useState } from 'react';

export default function NewFunnel() {
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState('');

  const createFunnel = async () => {
    setStatus('Generating...');
    const res = await fetch('/api/funnels/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    if (data.success) {
      setStatus('✅ Funnel created! View it at /sites/' + data.slug + '/funnel');
    } else {
      setStatus('❌ Error: ' + data.error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create a Lead Funnel</h1>
      <input
        placeholder="Funnel Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: '400px', padding: '0.5rem' }}
      />
      <br /><br />
      <button onClick={createFunnel}>Generate Funnel</button>
      <p>{status}</p>
    </div>
  );
}

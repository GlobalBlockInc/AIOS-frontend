import { useEffect, useState } from 'react';

export default function AdminAnalytics() {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetch(`/logs/summary-${today}.md`)
      .then(res => res.text())
      .then(setSummary)
      .catch(() => setSummary('No summary found.'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>📊 AIOS Daily Analytics</h1>
      <pre style={{ background: '#eee', padding: '1rem' }}>{summary}</pre>
    </div>
  );
}

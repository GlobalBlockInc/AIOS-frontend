'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [siteHTML, setSiteHTML] = useState('');
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchStatus() {
      const res = await fetch('/api/lockChecker');
      const data = await res.json();
      if (!data?.paid) {
        router.push('/pricing');
      } else {
        setPaid(true);
        const siteRes = await fetch('/api/site');
        const siteData = await siteRes.json();
        setSiteHTML(siteData?.html || '');
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: siteHTML }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('✅ Site published successfully!');
    } else {
      setMessage('❌ Failed to publish site.');
    }
    setSaving(false);
  }

  if (loading) return <div className="p-8">Loading your dashboard...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Website Dashboard</h1>
      <textarea
        className="w-full h-[500px] p-4 border border-gray-300 rounded mb-4 font-mono text-sm"
        value={siteHTML}
        onChange={(e) => setSiteHTML(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? 'Publishing...' : 'Publish Site'}
      </button>
      {message && <div className="mt-4 text-lg">{message}</div>}
    </div>
  );
}
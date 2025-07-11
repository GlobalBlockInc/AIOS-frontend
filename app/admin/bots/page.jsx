'use client';

import { useEffect, useState } from 'react';

export default function BotClicks({ searchParams }) {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
    const userSecret = localStorage.getItem('admin-secret');

    if (!userSecret || userSecret !== adminSecret) {
      alert('Unauthorized access – redirecting');
      window.location.href = '/';
      return;
    }

    fetch('/api/backend-proxy?path=/api/admin/stats')
      .then(res => res.json())
      .then(data => setClicks(data.botClicks || []));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">🤖 Most Clicked Bots</h2>
      <ul className="space-y-1">
        {clicks.map((b, i) => (
          <li key={i} className="border px-3 py-2 rounded">
            <b>{b.name}</b>: {b.count} clicks
          </li>
        ))}
      </ul>
    </div>
  );
}

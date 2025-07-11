'use client';

import { useEffect, useState } from 'react';

export default function ThriveSitesPage({ searchParams }) {
  const [sites, setSites] = useState([]);

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
      .then(data => setSites(data.sites || []));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">🏘️ Active ThriveSites</h2>
      <ul className="space-y-2">
        {sites.map((s, i) => (
          <li key={i} className="border p-3 rounded">
            <b>{s.siteName}</b> – {s.businessType}<br />
            Subdomain: <code>{s.subdomain}</code><br />
            Referral: {s.referralId || '—'}
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client'

import { useEffect, useState } from 'react';
import adminAuth from '../../../middleware/admin-auth';

export default function ThrivesitesPage({ searchParams }) {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userSecret = searchParams?.auth;

      const isAuthorized = adminAuth(userSecret);

      if (!isAuthorized) {
        alert('Unauthorized');
        window.location.href = '/';
        return;
      }
    }

    fetch('/api/backend-proxy?path=/api/admin/stats')
      .then(res => res.json())
      .then(data => setSites(data.sites || []));
  }, [searchParams]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">🚀 Active ThriveSites</h2>
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

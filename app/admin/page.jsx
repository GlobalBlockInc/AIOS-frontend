'use client';

import { useEffect } from 'react';

export default function AdminHome({ searchParams }) {
  useEffect(() => {
    const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
    const userSecret = localStorage.getItem('admin-secret');

    if (!userSecret || userSecret !== adminSecret) {
      alert('Unauthorized access – redirecting');
      window.location.href = '/';
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">🧠 Admin Overview</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Live ThriveSites deployed</li>
        <li>Bot rentals tracked</li>
        <li>Referral earnings tracked</li>
        <li>AssistantBot support enabled</li>
      </ul>
    </div>
  );
}

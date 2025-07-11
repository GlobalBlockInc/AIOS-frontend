'use client';

import { useEffect } from 'react';

export default function AssistantPage() {
  useEffect(() => {
    const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
    const userSecret = localStorage.getItem('admin-secret');

    if (!userSecret || userSecret !== adminSecret) {
      alert('Unauthorized access — redirecting');
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AssistantBot Admin Panel</h1>
      <p>This is where you can interact with the AssistantBot via chat.</p>
    </div>
  );
}

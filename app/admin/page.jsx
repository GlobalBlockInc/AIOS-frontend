'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedSecret = localStorage.getItem('admin-secret');
    const correctSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'thrive1234';

    if (storedSecret === correctSecret) {
      setAuthorized(true);
    } else {
      router.push('/admin-login');
    }

    setChecking(false);
  }, []);

  if (checking) return null;
  if (!authorized) return null;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Thriveomate Admin Panel</h1>
      <ul className="space-y-3 text-lg">
        <li><a href="/admin/thrivesites" className="text-purple-600 underline">Manage ThriveSites</a></li>
        <li><a href="/admin/logs" className="text-purple-600 underline">View System Logs</a></li>
        <li><a href="/admin/manager" className="text-purple-600 underline">Bot Manager</a></li>
        <li><a href="/admin/system-status" className="text-purple-600 underline">System Status</a></li>
      </ul>
    </main>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedSecret = localStorage.getItem('admin-secret');
    const correctSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'thrive1234';

    if (storedSecret === correctSecret) {
      setAuthorized(true);
    } else {
      router.push('/admin-login'); // Not authorized → redirect
    }
  }, []);

  if (!authorized) return null; // Prevent flicker

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h1>
      <ul className="list-disc pl-6">
        <li><a href="/admin/thrivesites" className="text-purple-600 underline">Manage ThriveSites</a></li>
        <li><a href="/admin/logs" className="text-purple-600 underline">System Logs</a></li>
        <li><a href="/admin/manager" className="text-purple-600 underline">Bot Manager</a></li>
        <li><a href="/admin/system-status" className="text-purple-600 underline">System Status</a></li>
      </ul>
    </div>
  );
}
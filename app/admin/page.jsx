'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const secret = localStorage.getItem('admin-secret');
    const expected = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'thrive1234';

    if (secret === expected) {
      setAuthorized(true);
    } else {
      router.push('/admin-login');
    }

    // Optional API validation:
    // fetch('/api/protected', {
    //   headers: { 'x-admin-secret': secret }
    // }).then(res => {
    //   if (!res.ok) router.push('/admin-login');
    // });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin-secret');
    localStorage.removeItem('admin-email');
    router.push('/admin-login');
  };

  if (!authorized) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Thriveomate Admin</h2>
        <nav className="space-y-3">
          <a href="/admin" className="block hover:text-purple-400">Dashboard Home</a>
          <a href="/admin/thrivesites" className="block hover:text-purple-400">Manage ThriveSites</a>
          <a href="/admin/logs" className="block hover:text-purple-400">System Logs</a>
          <a href="/admin/manager" className="block hover:text-purple-400">Bot Manager</a>
          <a href="/admin/system-status" className="block hover:text-purple-400">System Status</a>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 w-full py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h1>
        <p className="mb-4 text-gray-700">Here’s a quick overview of platform health:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>✅ ThriveSites live deployments</li>
          <li>✅ Active bot rentals being tracked</li>
          <li>✅ Referral system and earnings dashboard</li>
          <li>✅ AssistantBot support logic enabled</li>
        </ul>
      </main>
    </div>
  );
}
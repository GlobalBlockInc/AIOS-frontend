'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const realSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;

    if (!secret) {
      setError('Please enter the admin secret.');
      return;
    }

    localStorage.setItem('admin-secret', secret);

    if (secret === realSecret) {
      router.push('/admin');
    } else {
      setError('Invalid admin secret.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🔒 Admin Login</h1>
        <input
          type="password"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter Admin Secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          className="w-full bg-purple-600 text-white p-3 rounded-xl font-semibold hover:bg-purple-700"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

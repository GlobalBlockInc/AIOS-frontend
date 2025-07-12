'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'thrive1234';

    if (pass === adminSecret) {
      localStorage.setItem('admin-secret', pass);
      localStorage.setItem('admin-email', email);
      router.push('/admin');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyLoggedIn = localStorage.getItem('admin-secret');
      if (alreadyLoggedIn === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
        router.push('/admin');
      }
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Thriveomate Admin Dashboard</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-2 rounded"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
      </div>
    </main>
  );
}

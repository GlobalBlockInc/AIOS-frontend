'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'thrive1234';

    if (pass === adminSecret) {
      localStorage.setItem('admin-secret', pass);
      localStorage.setItem('admin-email', email);
      localStorage.setItem('admin-login-time', Date.now().toString());
      router.push('/admin/control');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    const storedSecret = localStorage.getItem('admin-secret');
    const loginTime = localStorage.getItem('admin-login-time');
    const expected = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'thrive1234';

    const isStillValid = () => {
      if (!loginTime) return false;
      const diff = (Date.now() - parseInt(loginTime)) / 1000 / 60;
      return diff <= 30; // minutes
    };

    if (storedSecret === expected && isStillValid()) {
      router.push('/admin/control');
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Thriveomate Admin Login</h1>
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
          className="w-full border p-2 mb-4 rounded"
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
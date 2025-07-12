'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;

    if (pass === adminSecret || pass === 'thrive1234') {  // fallback check
      localStorage.setItem('admin-secret', pass);
      router.push('/admin');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input
        type="password"
        placeholder="Enter admin password"
        className="w-full mb-4 p-2 border rounded"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}

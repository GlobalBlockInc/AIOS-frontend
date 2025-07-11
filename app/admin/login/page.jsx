'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const correctEmail = 'hyside76@gmail.com';
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_SECRET;

    if (email === correctEmail && password === correctPassword) {
      localStorage.setItem('admin-secret', correctPassword);
      router.push('/admin');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

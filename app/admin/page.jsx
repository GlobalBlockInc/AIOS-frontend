'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const secret = localStorage.getItem('admin-secret');

    if (!secret) {
      alert('Unauthorized access – redirecting');
      router.push('/');
      return;
    }

    // Optional: Test the auth with a real API call
    fetch('/api/protected', {
      headers: {
        'x-admin-secret': secret,
      },
    })
      .then(res => {
        if (res.ok) {
          setAuthorized(true);
        } else {
          alert('Unauthorized access – redirecting');
          router.push('/');
        }
      });
  }, []);

  if (!authorized) return null;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Thriveomate Admin Dashboard</h1>
      <ul className="list-disc pl-6">
        <li>Live ThriveSites deployed</li>
        <li>Bot rentals tracked</li>
        <li>Referral earnings tracked</li>
        <li>AssistantBot support enabled</li>
      </ul>
    </div>
  );
}

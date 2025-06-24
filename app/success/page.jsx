'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const markAsPaid = async () => {
      await fetch('/api/paid', { method: 'POST' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    };
    markAsPaid();
  }, [router]);

  return (
    <div className="max-w-xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful 🎉</h1>
      <p className="text-lg">Redirecting to your dashboard...</p>
    </div>
  );
}
'use client';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="max-w-xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Cancelled</h1>
      <p className="text-lg mb-4">You can go back and try again anytime.</p>
      <Link href="/pricing" className="text-blue-600 underline">Return to Pricing</Link>
    </div>
  );
}
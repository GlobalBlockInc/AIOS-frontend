'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const tier = searchParams.get('page') || 'starter';
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Checkout failed.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Confirm Your Plan</h1>
      <p className="mb-6 text-lg">You selected the <strong>{tier}</strong> plan.</p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
      >
        {loading ? 'Redirecting...' : 'Proceed to Payment'}
      </button>
    </div>
  );
}
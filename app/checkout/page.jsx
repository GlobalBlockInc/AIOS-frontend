'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const tiers = {
  starter: {
    name: 'Starter Plan',
    price: '$19/month',
    description: 'Launch your first AI website with basic tools and support.',
  },
  pro: {
    name: 'Pro Plan',
    price: '$49/month',
    description: 'Includes funnels, lead gen, and smart marketing tools.',
  },
  suite: {
    name: 'Business Suite',
    price: '$99/month',
    description: 'All-in-one system with CRM, analytics, and automation.',
  },
  empire: {
    name: 'Empire Edition',
    price: '$199/month',
    description: 'Full access + AI Video, Social Manager, and 24/7 AI Coach.',
  },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const selected = searchParams.get('page');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: selected }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Unknown error.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setLoading(false);
    }
  };

  const plan = tiers[selected] || tiers.starter;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-8">
      <div className="max-w-md w-full border rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{plan.name}</h1>
        <p className="text-lg text-blue-600 mb-2">{plan.price}</p>
        <p className="mb-6 text-sm text-gray-700">{plan.description}</p>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {loading ? 'Redirecting...' : `Subscribe to ${plan.name}`}
        </button>

        <p className="text-xs text-center mt-4 text-gray-500">
          You’ll be redirected to Stripe to complete your purchase.
        </p>
      </div>
    </div>
  );
}
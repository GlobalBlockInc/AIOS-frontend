'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const tiers = [
  {
    name: 'Starter',
    price: '$29',
    features: [
      'AI Website Generator',
      'Preview Before Payment',
      '1 Site Hosted',
    ],
    slug: 'starter'
  },
  {
    name: 'Pro',
    price: '$79',
    features: [
      'Includes Starter Features',
      'AI CRM & Funnel Builder',
      'Sales Tools + Stripe Checkout',
    ],
    slug: 'pro'
  },
  {
    name: 'Platinum',
    price: '$199',
    features: [
      'Includes Pro Features',
      'AI Marketing Engine',
      'Analytics, Store, Booking, More',
    ],
    slug: 'platinum'
  }
];

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier.slug} className="border rounded-xl p-6 shadow">
            <h2 className="text-2xl font-semibold mb-2">{tier.name}</h2>
            <p className="text-xl font-bold mb-4">{tier.price}</p>
            <ul className="mb-4 list-disc pl-5">
              {tier.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
            <button
              onClick={() => router.push(`/checkout?page=${tier.slug}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Select {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const plans = [
  {
    title: 'Starter',
    price: '$19/month',
    features: [
      '1 AI website',
      'Custom domain support',
      'Live preview & dashboard access',
      'Basic AI site editing',
      'AI Assistant onboarding',
    ],
    tier: 'starter',
  },
  {
    title: 'Pro',
    price: '$49/month',
    features: [
      '3 AI websites',
      'Advanced AI content editing',
      'Automated sales funnel builder',
      'Email list collection & AI lead follow-up',
      'AI-powered marketing engine',
      'Stripe & PayPal integration',
    ],
    tier: 'pro',
  },
  {
    title: 'Business Suite',
    price: '$99/month',
    features: [
      'Unlimited AI websites',
      'Done-for-you store or booking system',
      'AI CRM + customer automation',
      'AI Business Analytics & Coaching',
      'AI Legal Page Generator',
      'Affiliate Dashboard + Growth Tools',
    ],
    tier: 'suite',
  },
  {
    title: 'Empire Edition',
    price: '$199/month',
    features: [
      'Everything in Business Suite',
      'AI Video Generator (for social & YouTube)',
      'AI Social Media Manager',
      'Marketplace integrations',
      'Priority AI support + white-label features',
      'Personal AI Business Coach 24/7',
    ],
    tier: 'empire',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleSelect = (tier) => {
    setSelected(tier);
    router.push(`/checkout?page=${tier}`);
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Choose Your Plan</h1>
      <p className="text-center text-lg mb-12">
        Built for solopreneurs and small businesses that want to <strong>thrive with AI</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.tier} className="border rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{plan.title}</h2>
              <p className="text-xl text-blue-600 mb-4">{plan.price}</p>
              <ul className="list-disc list-inside text-sm mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleSelect(plan.tier)}
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Select {plan.title}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-600 text-sm">
        All plans include access to our AI dashboard, Thrive Assistant, and system updates.
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Your AI Business Engine</h1>
      <p className="text-lg mb-8">
        Launch, host, and grow fully automated AI websites — or earn passive income renting them to others.
      </p>

      <div className="flex justify-center gap-4 mb-10">
        <Link href="/thrive-sites">
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            Browse ThriveSites
          </button>
        </Link>
        <Link href="/admin/login">
          <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800">
            Go to Admin Panel
          </button>
        </Link>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Thriveomate?</h2>
        <ul className="text-left inline-block space-y-2">
          <li>💬 <strong>Built-In AI Bots</strong> — 100+ bots automate your business, from sales to support.</li>
          <li>⚡ <strong>Launch in 60 Seconds</strong> — Get a live site instantly, hosted and ready.</li>
          <li>💸 <strong>Earn Passive Income</strong> — Rent AI websites, courses, or host nodes for monthly payouts.</li>
          <li>🔒 <strong>Zero Maintenance</strong> — Hosting, security, AI, and updates are done for you.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Perfect For:</h2>
        <ul className="text-left inline-block space-y-2">
          <li>✅ Entrepreneurs launching new offers</li>
          <li>✅ Agencies building scalable services</li>
          <li>✅ Passive income seekers</li>
          <li>✅ Busy founders who want results without coding</li>
        </ul>
      </section>

      <p className="text-xl font-bold">
        Whether you're launching or earning — Thriveomate powers your empire.
      </p>

      <div className="mt-6">
        <Link href="/thrive-sites">
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 mr-4">
            Start Building
          </button>
        </Link>
        <Link href="/admin/login">
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
            Go to Admin Panel
          </button>
        </Link>
      </div>
    </main>
  );
}

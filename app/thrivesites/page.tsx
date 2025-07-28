"use client";
import Link from "next/link";

export default function ThriveSites() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Launch Your Website in Minutes</h1>
      <p className="text-lg mb-8">
        Rent a beautiful, AI‑powered website for your business. No coding. No headaches.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Plumber", "Cleaning", "Electrician"].map((industry) => (
          <div key={industry} className="border rounded-lg p-6 shadow-sm bg-white">
            <h2 className="text-2xl font-semibold mb-2">{industry} Websites</h2>
            <p className="text-sm text-gray-600 mb-4">
              Professionally designed templates, optimized for leads.
            </p>
            <Link
              href={`/thrivesites/create?industry=${industry.toLowerCase()}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

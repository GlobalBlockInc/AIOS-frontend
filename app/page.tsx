"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 text-white py-24 text-center">
        <h1 className="text-5xl font-bold mb-4">Create. Rent. Earn.</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Thriveomate empowers anyone to create AI-powered websites, apps, and courses — or rent what others have built. No coding. No hassle. Passive income made easy.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/creatorhub">
            <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition">
              Start Creating
            </button>
          </Link>
          <Link href="/marketplace">
            <button className="px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-900 transition">
              Browse Marketplace
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Why Thriveomate?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            { title: "AI-Powered Creation", desc: "Use CreatorBot to describe your idea. Our AI builds websites, apps, and tools for you — instantly." },
            { title: "Earn Passive Income", desc: "Launch your creations on the marketplace. Earn revenue every month as others rent your products." },
            { title: "Growing Marketplace", desc: "Explore a constantly expanding catalog of AI-built websites, apps, and courses — ready to rent." },
            { title: "No Coding Required", desc: "Anyone can create and monetize digital products without technical skills or complex setups." },
            { title: "Automated Hosting", desc: "We handle hosting, security, and scaling so you can focus on creating and earning." },
            { title: "Transparent Payouts", desc: "Integrated with Stripe. Get paid automatically when your products are rented." }
          ].map((f, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Build Your Digital Business?</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
          Join Thriveomate today. Create, rent, and earn from AI-powered websites, apps, and courses.
        </p>
        <Link href="/creatorhub">
          <button className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition">
            Get Started
          </button>
        </Link>
      </section>

      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} Thriveomate. All rights reserved.</p>
      </footer>
    </main>
  );
}
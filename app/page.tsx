import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 text-white py-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-5xl font-bold mb-4">
          Your AI Business Engine
        </motion.h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Launch, host, and grow fully automated AI websites — or earn passive income from your creations.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/thrivesites">
            <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition">
              Start Building
            </button>
          </Link>
          <Link href="/websitebot">
            <button className="px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-900 transition">
              Explore Features
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Everything You Need in One Platform</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            { title: "100+ Built-In AI Bots", desc: "Automate your business with next-gen AI bots for sales, marketing, and management." },
            { title: "ThriveSites", desc: "Launch stunning AI-generated websites in minutes — no coding required." },
            { title: "ThriveCourses", desc: "Create & license courses that generate recurring income for you." },
            { title: "Node Hosting", desc: "Contribute to our network and earn passive income from hosting power." },
            { title: "Earning System", desc: "Earn from referrals, website rentals, and AI-powered products." },
            { title: "Zero Maintenance", desc: "We handle security, hosting, and updates so you can focus on growth." }
          ].map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 max-w-4xl mx-auto">
          {["Sign Up", "Launch Your Website", "Earn & Grow"].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-6 bg-white rounded-lg shadow-md w-full">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center mx-auto text-lg font-bold mb-4">{i + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{step}</h3>
              <p className="text-gray-600">Step {i + 1} to start your AI-powered journey.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Passive Income Section */}
      <section className="py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Earn Passive Income</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
          Thriveomate lets you earn by renting websites, licensing courses, and inviting others to the platform. Build once, earn forever.
        </p>
        <Link href="/signup">
          <button className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition">
            Start Earning
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} Thriveomate. All rights reserved.</p>
      </footer>
    </main>
  );
}

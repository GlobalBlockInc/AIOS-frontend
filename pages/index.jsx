import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '3rem 2rem', maxWidth: '960px', margin: '0 auto' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#222' }}>
          Your AI Business Engine
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#555', marginTop: '1rem' }}>
          Launch, host, and grow fully automated AI websites — or earn passive income renting them to others.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link href="/thrivesites">
            <a style={ctaStyle}>Browse ThriveSites</a>
          </Link>
          <Link href="/admin">
            <a style={{ ...ctaStyle, backgroundColor: '#444' }}>Go to Admin Panel</a>
          </Link>
        </div>
      </section>

      {/* Why Thriveomate */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={sectionTitle}>Why Choose Thriveomate?</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
          <li>🧠 <strong>Built-In AI Bots</strong> — 100+ bots automate your business, from sales to support.</li>
          <li>⚡ <strong>Launch in 60 Seconds</strong> — Get a live site instantly, hosted and ready.</li>
          <li>💸 <strong>Earn Passive Income</strong> — Rent AI websites, courses, or host nodes for monthly payouts.</li>
          <li>🔐 <strong>Zero Maintenance</strong> — Hosting, security, AI, and updates are done for you.</li>
        </ul>
      </section>

      {/* Who It's For */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={sectionTitle}>Perfect For:</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
          <li>✅ Entrepreneurs launching new offers</li>
          <li>✅ Agencies building scalable services</li>
          <li>✅ Passive income seekers</li>
          <li>✅ Busy founders who want results without coding</li>
        </ul>
      </section>

      {/* Final CTA */}
      <section style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#222' }}>
          Whether you’re launching or earning — Thriveomate powers your empire.
        </h2>
        <div style={{ marginTop: '2rem' }}>
          <Link href="/thrivesites">
            <a style={ctaStyle}>Start Building</a>
          </Link>
          <Link href="/admin">
            <a style={{ ...ctaStyle, backgroundColor: '#444' }}>Go to Admin Panel</a>
          </Link>
        </div>
      </section>
    </main>
  );
}

const ctaStyle = {
  display: 'inline-block',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#0070f3',
  color: '#fff',
  borderRadius: '5px',
  margin: '0 1rem',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const sectionTitle = {
  fontSize: '1.75rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#222'
};

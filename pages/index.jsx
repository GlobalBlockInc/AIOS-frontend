import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#111" }}>
      {/* ThriveFund Banner */}
      <div style={{ backgroundColor: "#222", color: "#fff", padding: "15px", textAlign: "center" }}>
        Struggling with bills, life, or launching your dream?
        <Link href="/public/thrivefund" style={{ color: "#0af", fontWeight: "bold", marginLeft: "10px" }}>
          Apply to ThriveFund →
        </Link>
      </div>

      {/* Hero Section */}
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h1>Welcome to Thriveomate</h1>
        <p style={{ fontSize: "1.2em", marginTop: "10px" }}>
          Your AI-powered platform to launch, grow, and automate a business — or rebuild your life.
        </p>
        <Link href="/solostack" style={{ marginTop: "30px", display: "inline-block", padding: "15px 30px", backgroundColor: "#0070f3", color: "#fff", borderRadius: "6px", textDecoration: "none" }}>
          Try SoloStack Free →
        </Link>
      </div>

      {/* Tools Overview */}
      <section style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ textAlign: "center" }}>What You Can Do With Thriveomate</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "30px", gap: "30px" }}>
          <ToolCard title="LegalBot" desc="Generate NDAs, Terms of Service, and contracts instantly." link="/tools/legalbot" />
          <ToolCard title="RescueBot" desc="Struggling business? Let AI relaunch it for you." link="/tools/rescuebot" />
          <ToolCard title="TranslateBot" desc="Translate your content and pages into global languages." link="/tools/translatebot" />
          <ToolCard title="SafetyNet" desc="Emergency help for current users in crisis." link="/tools/safetynet" />
          <ToolCard title="ThriveFund" desc="Request help with bills, medical costs, or AI access." link="/public/thrivefund" />
        </div>
      </section>

      {/* Public Impact */}
      <section style={{ padding: "60px", textAlign: "center" }}>
        <h2>We’re Not Just a Platform. We’re a Movement.</h2>
        <p style={{ maxWidth: "700px", margin: "auto", fontSize: "1.1em", marginTop: "15px" }}>
          Thriveomate has already helped <strong>1,300+</strong> people get back on their feet.
          Whether it’s launching a side hustle, rebuilding after burnout, or paying a critical bill — we show up when others walk away.
        </p>
        <Link href="/public/ledger" style={{ marginTop: "20px", display: "inline-block", padding: "12px 24px", backgroundColor: "#333", color: "#fff", borderRadius: "5px", textDecoration: "none" }}>
          View the ThriveFund Ledger →
        </Link>
      </section>

      {/* AI Security Section */}
      <section style={{ backgroundColor: "#111", color: "#fff", padding: "60px", textAlign: "center" }}>
        <h2>Enterprise-Grade AI Security. For Everyone.</h2>
        <p style={{ fontSize: "1.1em", maxWidth: "700px", margin: "auto", marginTop: "15px" }}>
          Thriveomate is protected by ShieldBot — our AI-driven system that monitors, detects, and stops threats before they reach your site.
          With real-time abuse detection, regional failover, and self-healing logic, we protect your business like it's a billion-dollar enterprise.
        </p>
        <p style={{ marginTop: "20px", fontSize: "0.9em", color: "#ccc" }}>
          No bloatware. No spyware. Just security that actually works.
          <br />
          <Link href="/security" style={{ color: "#0af", fontWeight: "bold" }}>Learn more about Thriveomate Security →</Link>
        </p>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#f0f0f0", padding: "30px", textAlign: "center", fontSize: "0.95em", marginTop: "60px" }}>
        <p>&copy; {new Date().getFullYear()} Thriveomate. Powered by AI. Built to help people thrive.</p>
        <p>Need support? <Link href="/public/thrivefund">Apply to ThriveFund</Link> or explore our <Link href="/tools/safetynet">SafetyNet system</Link>.</p>
      </footer>
    </div>
  );
}

function ToolCard({ title, desc, link }) {
  return (
    <div style={{ width: "260px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <Link href={link} style={{ color: "#0070f3", fontWeight: "bold" }}>Open →</Link>
    </div>
  );
}

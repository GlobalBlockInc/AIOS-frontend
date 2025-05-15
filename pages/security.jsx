export default function SecurityPage() {
  return (
    <div style={{ padding: "60px 20px", maxWidth: "900px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1>Security & AI Defense System</h1>
      <p style={{ fontSize: "1.1em", marginBottom: "30px" }}>
        Thriveomate is protected by <strong>ShieldBot</strong>, a 24/7 AI-powered security system that detects threats, blocks abuse, and self-heals from attacks — faster and smarter than traditional software.
      </p>

      <section style={sectionStyle}>
        <h2>Why We Built ShieldBot</h2>
        <p>
          Unlike legacy security companies that rely on signatures and slow updates, ShieldBot is proactive. It scans all system activity in real-time using advanced AI and pattern recognition.
        </p>
        <ul>
          <li>Blocks spam, scraping, and bad actors automatically</li>
          <li>Quarantines abnormal activity and IPs instantly</li>
          <li>Detects zero-day threats before they cause harm</li>
          <li>Heals system files if corruption is detected</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>Global AI Security Network</h2>
        <p>
          All ShieldBot-protected nodes share insights with each other across regions. This means if an attack hits Asia, nodes in the US and Europe automatically adapt.
        </p>
        <ul>
          <li>Multi-region failover (USA, EU, Asia)</li>
          <li>Smart escalation system — minimal human intervention</li>
          <li>Zero-trust infrastructure for user data</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>You’re Protected, Always</h2>
        <p>
          Every user and site created on Thriveomate benefits from ShieldBot protection automatically. No configuration required. No upsells. Just peace of mind.
        </p>
        <p>
          Have questions? Contact us or view our{" "}
          <a href="/donate" style={{ color: "#0070f3" }}>ThriveFund mission</a> to see how we reinvest into safety and support.
        </p>
      </section>
    </div>
  );
}

const sectionStyle = {
  marginBottom: "40px",
  lineHeight: "1.6"
};

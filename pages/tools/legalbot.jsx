import { useState } from "react";

export default function LegalBotPage() {
  const [docType, setDocType] = useState("Privacy Policy");
  const [businessName, setBusinessName] = useState("");
  const [details, setDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch("/api/legalbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docType, businessName, details })
    });
    const data = await res.json();
    setResult(data.document);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "50px 20px", fontFamily: "sans-serif" }}>
      <h1>LegalBot — Instant Legal Documents</h1>
      <p>Need a Privacy Policy, NDA, or contract? LegalBot uses AI to generate it instantly and accurately.</p>

      <select value={docType} onChange={e => setDocType(e.target.value)} style={inputStyle}>
        <option>Privacy Policy</option>
        <option>Terms of Service</option>
        <option>NDA</option>
        <option>Freelance Contract</option>
        <option>Client Agreement</option>
      </select>

      <input
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
        placeholder="Your Business Name"
        style={inputStyle}
      />

      <textarea
        value={details}
        onChange={e => setDetails(e.target.value)}
        placeholder="Describe your situation or terms"
        rows={4}
        style={inputStyle}
      />

      <button onClick={generate} style={buttonStyle}>
        {loading ? "Generating..." : "Generate Document"}
      </button>

      {result && (
        <div style={{ marginTop: "30px", background: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <h3>{docType}</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  fontSize: "1em",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  marginTop: "20px",
  padding: "12px 24px",
  backgroundColor: "#0070f3",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

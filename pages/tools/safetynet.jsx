import { useState } from "react";

export default function SafetyNetPage() {
  const [reason, setReason] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = "demo-user-001";

  const submitRequest = async () => {
    setLoading(true);
    const res = await fetch("/api/safetynet-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, reason, urgency })
    });
    const data = await res.json();
    setResponse(data?.response || "Something went wrong.");
    setLoading(false);
  };

  return (
    <div style={{ padding: "50px 20px", maxWidth: "900px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1>SafetyNet — AI Emergency Support for Thriveomate Users</h1>
      <p>If you're struggling financially, emotionally, or need time — SafetyNet can offer help, credit, or encouragement. You are not alone.</p>

      <label>Your Situation</label>
      <textarea
        value={reason}
        onChange={e => setReason(e.target.value)}
        placeholder="Tell us what's going on — be honest and detailed."
        rows={4}
        style={inputStyle}
      />

      <label>Urgency Level</label>
      <select value={urgency} onChange={e => setUrgency(e.target.value)} style={inputStyle}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={submitRequest} disabled={loading} style={buttonStyle}>
        {loading ? "Submitting..." : "Submit Request"}
      </button>

      {response && (
        <div style={{ marginTop: "30px", backgroundColor: "#e7ffe7", padding: "20px", borderRadius: "8px" }}>
          <h3>ThriveAI Response:</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{response}</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0 20px",
  fontSize: "1em",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "#0070f3",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

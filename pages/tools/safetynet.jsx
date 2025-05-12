import { useState } from "react";

export default function SafetyNetPage() {
  const [reason, setReason] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [response, setResponse] = useState("");
  const userId = "demo-user-001";

  const submit = async () => {
    const res = await fetch("/api/safetynet-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, reason, urgency })
    });
    const data = await res.json();
    setResponse(data.response || "Something went wrong.");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Emergency Help — Thriveomate SafetyNet</h1>
      <p>If you're struggling financially, emotionally, or just need support — we’re here for you. This AI-powered system gives you personalized help and never judges.</p>

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Tell us why you need support..."
        rows={5}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <select value={urgency} onChange={(e) => setUrgency(e.target.value)} style={{ marginTop: "10px", padding: "10px" }}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={submit} style={{ marginTop: "15px", padding: "10px 20px" }}>
        Submit Request
      </button>

      {response && (
        <div style={{ marginTop: "30px", background: "#eef", padding: "20px", borderRadius: "8px" }}>
          <h3>ThriveAI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

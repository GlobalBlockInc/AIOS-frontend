import { useState } from "react";

export default function RescueBotPage() {
  const [desc, setDesc] = useState("");
  const [problems, setProblems] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = "demo-user-001";

  const runRescue = async () => {
    setLoading(true);
    const res = await fetch("/api/rescuebot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, businessDesc: desc, problems })
    });
    const data = await res.json();
    setReport(data?.report || "No response");
    setLoading(false);
  };

  return (
    <div style={{ padding: "50px 20px", maxWidth: "900px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1>RescueBot — Relaunch Your Business with AI</h1>
      <p>If your site or business isn't working, RescueBot will analyze the problem and create a personalized relaunch plan — powered by Thriveomate AI.</p>

      <label>Your Business or Project Description</label>
      <textarea
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="Tell us about your business or website..."
        rows={4}
        style={inputStyle}
      />

      <label>What's Not Working or Needs Help?</label>
      <textarea
        value={problems}
        onChange={e => setProblems(e.target.value)}
        placeholder="Explain any issues, failures, or obstacles you've faced"
        rows={3}
        style={inputStyle}
      />

      <button onClick={runRescue} disabled={loading} style={buttonStyle}>
        {loading ? "Analyzing..." : "Run RescueBot"}
      </button>

      {report && (
        <div style={{ marginTop: "30px", background: "#eef", padding: "20px", borderRadius: "8px" }}>
          <h3>Rescue Plan:</h3>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.95em" }}>{report}</pre>
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

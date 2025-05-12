import { useState } from "react";

export default function RescueBotPage() {
  const [desc, setDesc] = useState("");
  const [problems, setProblems] = useState("");
  const [report, setReport] = useState("");
  const userId = "demo-user-001";

  const runRescue = async () => {
    const res = await fetch("/api/rescuebot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, businessDesc: desc, problems })
    });
    const data = await res.json();
    setReport(data.report || "No response");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>RescueBot — Relaunch Your Business</h1>
      <p>If your business or site is struggling, RescueBot can help you relaunch with a stronger offer and better strategy — powered by AI.</p>

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Describe your business or website..."
        rows={4}
        style={{ width: "100%", marginTop: "10px", padding: "10px" }}
      />

      <textarea
        value={problems}
        onChange={(e) => setProblems(e.target.value)}
        placeholder="What's not working or needs improvement?"
        rows={3}
        style={{ width: "100%", marginTop: "10px", padding: "10px" }}
      />

      <button onClick={runRescue} style={{ marginTop: "15px", padding: "10px 20px" }}>
        Run RescueBot
      </button>

      {report && (
        <div style={{ marginTop: "30px", background: "#eef", padding: "20px", borderRadius: "8px" }}>
          <h3>Rescue Plan:</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{report}</pre>
        </div>
      )}
    </div>
  );
}

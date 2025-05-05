import { useState } from "react";

export default function AdminPanel() {
  const [command, setCommand] = useState("");
  const [bot, setBot] = useState("");
  const [log, setLog] = useState([]);

  const sendCommand = async () => {
    if (!bot) {
      alert("Select a bot first");
      return;
    }

    const res = await fetch(`/api/ai/command?bot=${bot}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        command, 
        decision: command, 
        app: command, 
        campaign: command, 
        partner: command, 
        task: command 
      }),
    });

    const data = await res.json();

    setLog((prev) => [...prev, `→ ${bot}: ${data.result || data.error}`]);
    setCommand("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI OS Admin Panel V2</h1>

      <p><strong>Command:</strong></p>
      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter task, idea or command"
      />
      <br /><br />

      <p><strong>Select Bot:</strong></p>
      <select value={bot} onChange={(e) => setBot(e.target.value)}>
        <option value="">-- Select Bot --</option>
        <option value="manager">ManagerBot</option>
        <option value="test">TestBot</option>
        <option value="creator">CreatorBot</option>
        <option value="selfheal">SelfHealBot</option>
        <option value="ai-ceo">AI CEOBot</option>
        <option value="deploy">DeployBot</option>
        <option value="marketing">MarketingBot</option>
        <option value="partner">PartnerBot</option>
        <option value="scheduler">SchedulerBot</option>
      </select>

      <br /><br />
      <button onClick={sendCommand}>Send Command</button>

      <h3>Bot Responses</h3>
      <div style={{ background: "#f0f0f0", padding: "10px", minHeight: "200px" }}>
        {log.map((l, idx) => (
          <div key={idx}>{l}</div>
        ))}
      </div>
    </div>
  );
}
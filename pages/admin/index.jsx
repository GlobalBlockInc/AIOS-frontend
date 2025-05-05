import { useState } from "react";

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function sendCommand(command) {
    const res = await fetch("/api/admin/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: command })
    });
    const data = await res.json();
    setOutput(data.response);
  }

  return (
    <div>
      <h1>AI OS Admin Panel</h1>
      <input 
        type="text" 
        placeholder="Ask AI Bot..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={() => sendCommand(input)}>Send</button>
      <pre>{output}</pre>

      <h3>Quick Commands:</h3>
      <button onClick={() => sendCommand("Check system health")}>Run Self Heal</button>
      <button onClick={() => sendCommand("Generate new SoloStack site named TestSite")}>Generate AI Site</button>
      <button onClick={() => sendCommand("What is status of backend?")}>Ask Status</button>
    </div>
  );
}

import { useState } from 'react';

export default function Copilot() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  const sendCommand = () => {
    fetch('/api/ai/command', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command })
    })
      .then(res => res.json())
      .then(data => setResponse(data.result));
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>AI Copilot</h1>
      <input placeholder="Enter Command" value={command} onChange={e => setCommand(e.target.value)} />
      <button onClick={sendCommand}>Send</button>
      <p>{response}</p>
    </div>
  );
}

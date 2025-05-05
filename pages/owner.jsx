import React, { useState } from "react";

export default function OwnerPanel() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  const sendCommand = async () => {
    const res = await fetch("/api/ai/owner-command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command }),
    });
    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <div>
      <h1>AI OS EMPIRE OWNER COMMAND PANEL</h1>
      <input
        type="text"
        placeholder="Type command..."
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <button onClick={sendCommand}>Send</button>
      <h3>AI Response:</h3>
      <p>{response}</p>
    </div>
  );
}

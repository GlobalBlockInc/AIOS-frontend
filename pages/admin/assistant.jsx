import { useState } from "react";

export default function AIOSAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    fetch("/api/ai/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([...messages, { role: "user", text: input }, { role: "ai", text: data.result }]);
        setInput("");
      });
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>AIOS Assistant (Ask Anything)</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          style={{ width: 400 }}
          placeholder="Ask a question or give a command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
     

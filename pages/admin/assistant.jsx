import { useState } from "react";

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const res = await fetch("/api/admin/ai-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    if (data.success) {
      setChat([...chat, { role: "user", content: input }, { role: "ai", content: data.response }]);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>AI Admin Assistant (Creator Mode)</h2>

      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px", height: "400px", overflowY: "scroll" }}>
        {chat.map((c, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <strong>{c.role === "user" ? "You" : "AI"}:</strong> {c.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI to create, build or manage..."
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px" }}>
        Send
      </button>
    </div>
  );
}
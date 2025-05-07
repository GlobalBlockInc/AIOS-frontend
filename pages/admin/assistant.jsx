import { useState, useEffect } from "react";

const memory = [];

export default function AIOSAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load memory if needed in future (right now simple memory in this file)
  }, []);

  const sendMessage = () => {
    const newMessage = { role: "user", text: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    memory.push(newMessage);

    fetch("/api/ai/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: buildPrompt(updatedMessages) }),
    })
      .then((res) => res.json())
      .then((data) => {
        const aiResponse = { role: "ai", text: data.result };
        setMessages([...updatedMessages, aiResponse]);
        memory.push(aiResponse);

        // Optional: detect smart commands
        detectSmartCommands(data.result);
      });

    setInput("");
  };

  const buildPrompt = (messages) => {
    let context = "You are the AIOS Empire Assistant. Help the owner make decisions, suggest upgrades, and run bots when asked.\n";
    context += "You know about SoloStack, AI Shield, Partner Nodes, Referral Programs, SeedBots, Marketing Bots, UltraDirector.\n";
    context += "You are kind, strategic, and focused on business growth and user happiness.\n\n";
    messages.forEach(msg => {
      context += `${msg.role === "user" ? "User" : "AI"}: ${msg.text}\n`;
    });
    context += "AI:";
    return context;
  };

  const detectSmartCommands = (text) => {
    if (text.includes("Create new SeedBot")) {
      console.log("🚨 AIOS COMMAND → Creating new SeedBot...");
      // here you would actually call the API to trigger bot creation
    }

    if (text.includes("Deploy new SoloStack site")) {
      console.log("🚨 AIOS COMMAND → Deploying new SoloStack site...");
      // here you would actually call the API to trigger SoloStack bot
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>AIOS Assistant PRO (Ask + Command + Memory)</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          style={{ width: 400 }}
          placeholder="Ask or command AIOS..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div style={{ maxHeight: 500, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.text}</p>
        ))}
      </div>
    </div>
  );
}

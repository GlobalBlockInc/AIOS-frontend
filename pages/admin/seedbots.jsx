import { useState, useEffect } from 'react';

export default function SeedBotsPage() {
  const [seedbots, setSeedbots] = useState([]);
  const [input, setInput] = useState("");
  const [selectedBot, setSelectedBot] = useState("Customer Support Bot");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch('/api/seedbots')
      .then(res => res.json())
      .then(data => setSeedbots(data));
  }, []);

  const runBot = () => {
    fetch('/api/seedbots', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bot: selectedBot, input })
    }).then(res => res.json())
      .then(data => {
        setResult(data.result);
      });
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>AIOS SeedBots Manager</h1>

      <select onChange={(e) => setSelectedBot(e.target.value)} value={selectedBot}>
        <option>Customer Support Bot</option>
        <option>Lead Magnet Bot</option>
        <option>Marketing Bot</option>
        <option>Bookkeeper Bot</option>
        <option>Blog / Content Bot</option>
        <option>Upsell Bot</option>
      </select>

      <input placeholder="Enter command or idea" value={input} onChange={e => setInput(e.target.value)} />

      <button onClick={runBot}>Run SeedBot</button>

      <h2>Result:</h2>
      <p>{result}</p>

      <h3>Recent Activity:</h3>
      <ul>
        {seedbots.map((b, i) => (
          <li key={i}>{b.botName} → {b.input} → {b.result} → {b.date}</li>
        ))}
      </ul>
    </div>
  );
}

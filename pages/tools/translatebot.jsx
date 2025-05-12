import { useState } from "react";

export default function TranslateBotPage() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("Spanish");
  const [result, setResult] = useState("");
  const userId = "demo-user-001";

  const translate = async () => {
    const res = await fetch("/api/translate-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, toLang: language, userId })
    });
    const data = await res.json();
    setResult(data.translated || "No result");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>TranslateBot — AI Language Localizer</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter content to translate..."
        rows={5}
        style={{ width: "100%", padding: "10px" }}
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ marginTop: "10px" }}>
        <option>Spanish</option>
        <option>French</option>
        <option>German</option>
        <option>Arabic</option>
        <option>Chinese</option>
        <option>Hindi</option>
        <option>Portuguese</option>
      </select>
      <button onClick={translate} style={{ marginTop: "15px", padding: "10px 20px" }}>
        Translate
      </button>

      {result && (
        <div style={{ marginTop: "30px", background: "#eef", padding: "20px", borderRadius: "8px" }}>
          <h3>Translation:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

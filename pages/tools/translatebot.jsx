import { useState } from "react";

export default function TranslateBotPage() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("Spanish");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = "demo-user-001";

  const handleTranslate = async () => {
    setLoading(true);
    const res = await fetch("/api/translate-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, toLang: language, userId })
    });
    const data = await res.json();
    setTranslated(data?.translated || "Translation failed.");
    setLoading(false);
  };

  return (
    <div style={{ padding: "50px 20px", maxWidth: "900px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1>TranslateBot — Localize Instantly</h1>
      <p>Enter your content and choose a language. TranslateBot will return an accurate, human-sounding translation using AI.</p>

      <label>Enter content to translate</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter website content, messages, or UI text..."
        rows={4}
        style={inputStyle}
      />

      <label>Choose Target Language</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)} style={inputStyle}>
        <option>Spanish</option>
        <option>French</option>
        <option>German</option>
        <option>Arabic</option>
        <option>Chinese</option>
        <option>Portuguese</option>
        <option>Hindi</option>
        <option>Russian</option>
      </select>

      <button onClick={handleTranslate} disabled={loading} style={buttonStyle}>
        {loading ? "Translating..." : "Translate"}
      </button>

      {translated && (
        <div style={{ marginTop: "30px", backgroundColor: "#f1f1f1", padding: "20px", borderRadius: "8px" }}>
          <h3>Translation Result:</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{translated}</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0 20px",
  fontSize: "1em",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "#0070f3",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

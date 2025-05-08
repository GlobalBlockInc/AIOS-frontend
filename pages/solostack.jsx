import React, { useState, useEffect } from "react";

export default function SoloStack() {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [saved, setSaved] = useState(false);
  const [userTier, setUserTier] = useState("free"); // free, pro, nodepartner
  const [username, setUsername] = useState("");
  const [savedSites, setSavedSites] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("solostack_user");
    const tier = localStorage.getItem("solostack_tier");

    if (user) setUsername(user);
    if (tier) setUserTier(tier);

    if (user) {
      fetch(`/api/solostack/saved?username=${user}`)
        .then(res => res.json())
        .then(data => setSavedSites(data.sites));
    }
  }, []);

  const handleGenerate = async () => {
    if (!businessName || !description) {
      alert("Please fill out both fields.");
      return;
    }

    setGenerating(true);
    setResult("");
    setSaved(false);

    const res = await fetch("/api/solostack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessName, description })
    });

    const data = await res.json();
    setResult(data.generatedSite);
    setGenerating(false);
  };

  const handleSave = async () => {
    const res = await fetch("/api/solostack/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, businessName, html: result })
    });

    if (res.ok) {
      setSaved(true);
      const newSites = await res.json();
      setSavedSites(newSites.sites);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `${businessName || "website"}.html`;
    document.body.appendChild(element);
    element.click();
  };

  const handleLogin = () => {
    const user = prompt("Enter your username:");
    if (user) {
      localStorage.setItem("solostack_user", user);
      localStorage.setItem("solostack_tier", "pro"); // in production, check against real plans
      setUsername(user);
      setUserTier("pro");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI SoloStack - Instant AI Website Generator</h1>

      {username ? (
        <p>Welcome, {username} ({userTier}) {userTier === "nodepartner" && <>🌟 Node Partner</>}</p>
      ) : (
        <button onClick={handleLogin}>Login / Create Free Account</button>
      )}

      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "300px" }}
      />

      <textarea
        placeholder="What does your business do?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "300px", height: "100px" }}
      />

      <button onClick={handleGenerate} disabled={generating}>
        {generating ? "Generating..." : "Generate AI Site"}
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Your AI Generated Site:</h2>
          <pre style={{ background: "#eee", padding: "20px", whiteSpace: "pre-wrap" }}>{result}</pre>

          {userTier !== "free" ? (
            <>
              <button onClick={handleDownload} style={{ marginRight: "10px" }}>Download HTML</button>
              <button onClick={handleSave}>Save to My Sites</button>
              {saved && <p style={{ color: "green" }}>Saved!</p>}
            </>
          ) : (
            <p style={{ color: "red" }}>Upgrade to PRO to Save + Download!</p>
          )}
        </div>
      )}

      {savedSites.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3>My Saved Sites</h3>
          <ul>
            {savedSites.map((site, idx) => (
              <li key={idx}>{site.businessName} (Saved at {site.savedAt})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";

export default function SoloStack() {
  const [siteName, setSiteName] = useState("");
  const [template, setTemplate] = useState("Business");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  const handleGenerate = async () => {
    if (!siteName || !description) {
      setStatus("Please fill out all fields.");
      return;
    }

    setStatus("Generating your website...");

    try {
      const res = await fetch("/api/ai/solostack-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          template,
          description
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Website generated!");
        setSiteUrl(data.site.url);
      } else {
        setStatus("Error generating site: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>AI SoloStack Website Generator</h1>

      <p>Create an instant website using AI — free or upgrade anytime.</p>

      <div style={{ marginBottom: "10px" }}>
        <label>Site Name: </label><br />
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="My Business"
          style={{ padding: "10px", width: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Template: </label><br />
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        >
          <option value="Business">Business</option>
          <option value="Portfolio">Portfolio</option>
          <option value="Landing Page">Landing Page</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Personal Blog">Personal Blog</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Brief Description: </label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what this site should be about"
          style={{ padding: "10px", width: "300px", height: "100px" }}
        />
      </div>

      <button
        onClick={handleGenerate}
        style={{ padding: "12px 25px", background: "#333", color: "#fff", border: "none", cursor: "pointer" }}
      >
        Generate Website
      </button>

      <div style={{ marginTop: "20px" }}>
        <strong>Status:</strong> {status}
      </div>

      {siteUrl && (
        <div style={{ marginTop: "20px" }}>
          <a href={siteUrl} target="_blank" rel="noopener noreferrer">
            → View Generated Website
          </a>
        </div>
      )}
    </div>
  );
}
"use client";
import { useState } from "react";

export default function CreateSite() {
  const [template, setTemplate] = useState("plumber-1");
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleCreate = async () => {
    setLoading(true);
    const res = await fetch("/api/thrivesites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template_name: template, subdomain })
    });
    const data = await res.json();
    setResult(data.status === "success" ? "Site deployed successfully!" : data.detail);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Your ThriveSite</h1>
      <label className="block mb-2">Choose Template</label>
      <select
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      >
        <option value="plumber-1">Plumber</option>
        <option value="cleaning-1">Cleaning</option>
        <option value="electrician-1">Electrician</option>
      </select>

      <label className="block mb-2">Subdomain</label>
      <input
        type="text"
        placeholder="mybusiness"
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Deploying..." : "Deploy My Site"}
      </button>

      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  );
}

"use client";
import { useState } from "react";
import axios from "axios";

export default function WebsiteBot() {
  const [sitename, setSitename] = useState("");
  const [template, setTemplate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const createWebsite = async () => {
    if (!sitename) {
      setError("Please enter a site name");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("/api/websitebot/create", { sitename, template, description });
      if (res.data.success) {
        setResult(res.data.url);
      } else {
        setError("Failed to create site");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">
        WebsiteBot – Build Your AI-Powered Website
      </h1>
      <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg shadow">
        <label className="block mb-4">
          <span className="text-gray-700">Site Name</span>
          <input
            type="text"
            value={sitename}
            onChange={(e) => setSitename(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
            placeholder="mybusiness"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Template (leave empty for AI Build)</span>
          <input
            type="text"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
            placeholder="plumber-template"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Description (optional for AI build)</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
            placeholder="A modern plumbing website with booking features"
          ></textarea>
        </label>

        <button
          onClick={createWebsite}
          disabled={loading}
          className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800 transition"
        >
          {loading ? "Building your site..." : "Create Website"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {result && (
          <div className="mt-6 text-center">
            <p className="text-green-700 font-semibold">Your website is live:</p>
            <a href={result} target="_blank" className="text-blue-600 underline">
              {result}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

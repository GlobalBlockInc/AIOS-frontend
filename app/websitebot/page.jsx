'use client';

import { useState } from 'react';

export default function WebsiteBotPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateWebsite = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot: 'websitebot',
          prompt,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        setResponse(data.content || 'Website generated.');
      } else {
        setResponse(data?.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setResponse('Error: Could not generate website.');
    }

    setLoading(false);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">WebsiteBot 🧠</h1>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows="5"
        placeholder="Describe the website you want to build..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={generateWebsite}
        disabled={loading}
      >
        {loading ? 'Building...' : 'Build Website'}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded border">
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </main>
  );
}

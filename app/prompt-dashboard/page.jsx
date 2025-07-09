'use client'

import { useState, useEffect } from 'react'

export default function PromptDashboardPage() {
  const [bots, setBots] = useState([])
  const [selectedBot, setSelectedBot] = useState('')
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/prompt-dashboard/bots')
      .then(res => res.json())
      .then(data => setBots(data.bots))
  }, [])

  const runPrompt = async () => {
    if (!selectedBot || !prompt) return alert('Select a bot and enter a prompt.')
    setLoading(true)
    setResponse('')
    const res = await fetch('/api/prompt-dashboard/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bot: selectedBot, prompt })
    })
    const data = await res.json()
    setResponse(data.output || 'No response')
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Prompt Dashboard</h1>

      <select
        className="w-full p-2 border mb-4"
        value={selectedBot}
        onChange={(e) => setSelectedBot(e.target.value)}
      >
        <option value="">Select a Bot</option>
        {bots.map((bot) => (
          <option key={bot} value={bot}>{bot}</option>
        ))}
      </select>

      <textarea
        rows={4}
        className="w-full p-2 border mb-4"
        placeholder="Type your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={runPrompt}
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Prompt'}
      </button>

      {response && (
        <pre className="mt-6 bg-gray-100 p-4 whitespace-pre-wrap">
          {response}
        </pre>
      )}
    </div>
  )
}

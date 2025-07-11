// /app/thrivesites/page.jsx
'use client'
import { useState } from 'react'

export default function ThriveSitesPage() {
  const [siteName, setSiteName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(null)

  const generateSite = async () => {
    setStatus('Generating...')
    const res = await fetch('/api/backend-proxy?path=/api/thrivesites/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteName, businessType, description })
    })
    const data = await res.json()
    if (data.success) {
      setStatus(`✅ Site ready: ${data.url}`)
    } else {
      setStatus(`❌ ${data.error || 'Error generating site.'}`)
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ThriveSites Generator</h1>
      <input value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="Site Name" className="border p-2 mb-2 w-full" />
      <input value={businessType} onChange={e => setBusinessType(e.target.value)} placeholder="Business Type" className="border p-2 mb-2 w-full" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Site Description" className="border p-2 mb-2 w-full" />
      <button onClick={generateSite} className="bg-blue-600 text-white px-4 py-2 rounded">Generate Site</button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}

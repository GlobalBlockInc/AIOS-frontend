'use client'
import { useState } from 'react'

export default function ThriveSitesPage() {
  const [siteName, setSiteName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const startCheckout = async () => {
    if (!siteName || !businessType) {
      setStatus('❌ Site name and business type are required.')
      return
    }

    setStatus('⏳ Redirecting to payment...')

    const res = await fetch('/api/backend-proxy?path=/api/thrivesites/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteName, businessType, description })
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      setStatus(`❌ ${data.error || 'Checkout error'}`)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Launch Your ThriveSite</h1>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Your business or brand name"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Business type (e.g. Plumber, Bakery, Coaching)"
        value={businessType}
        onChange={(e) => setBusinessType(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-3"
        placeholder="Describe your business or any special request (optional)"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={startCheckout}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Pay & Launch ThriveSite ($99/mo)
      </button>

      <p className="text-sm mt-3">{status}</p>
    </div>
  )
}

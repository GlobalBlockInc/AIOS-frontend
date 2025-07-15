'use client'
import { useState } from 'react'

export default function AdminHome() {
  const [input, setInput] = useState('')
  const [authorized, setAuthorized] = useState(false)

  const handleLogin = () => {
    if (input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthorized(true)
    } else {
      alert('Unauthorized Access')
    }
  }

  if (!authorized) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Admin Panel</h1>
      {/* Link or show subcomponents here */}
    </div>
  )
}
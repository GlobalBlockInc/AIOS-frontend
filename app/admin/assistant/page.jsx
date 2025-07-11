'use client'
import { useState } from 'react'
import adminAuth from '../../../middleware/admin-auth';

export default function AssistantBot({ searchParams }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  if (!checkAdmin({ url: `?auth=${searchParams?.auth}` })) return <div>❌ Unauthorized</div>

  const sendMessage = async () => {
    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')

    const res = await fetch('/api/backend-proxy?path=/api/admin/assistantbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] })
    })
    const data = await res.json()
    setMessages([...messages, userMessage, { role: 'assistant', content: data.reply }])
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">💬 AssistantBot (MiniMax)</h2>
      <div className="bg-white border h-64 p-3 mb-3 overflow-y-scroll rounded">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-blue-700' : 'text-black'}`}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-1 rounded">
        Send
      </button>
    </div>
  )
}

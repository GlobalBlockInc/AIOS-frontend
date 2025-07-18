'use client'

import React, { useEffect, useState } from 'react'

export default function DictionaryPage() {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch('/api/admin/dictionary')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📖 WordBot Dictionary</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([word, def]) => (
          <div key={word} className="bg-white rounded-xl p-4 shadow">
            <div className="text-xl font-semibold">{word}</div>
            <div className="text-gray-600">{def}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

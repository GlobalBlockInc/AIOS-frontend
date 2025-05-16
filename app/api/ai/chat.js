import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.json()
  const prompt = body.prompt || "Hello"

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt,
        stream: false
      })
    })

    const result = await response.json()
    return NextResponse.json({ success: true, response: result.response })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message })
  }
}

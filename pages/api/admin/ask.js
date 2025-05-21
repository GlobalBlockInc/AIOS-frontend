export default async function handler(req, res) {
  const { prompt } = req.body;
  const logData = require('fs').readFileSync('/root/.pm2/logs/managerbot-cron-out.log', 'utf-8');

  const fullPrompt = `System logs:\n${logData}\n\nQuestion: ${prompt}`;

  try {
    const ollamaRes = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: fullPrompt,
        stream: false
      })
    });

    const json = await ollamaRes.json();
    res.json({ reply: json.response });
  } catch (err) {
    res.status(500).json({ reply: 'Error querying Ollama: ' + err.message });
  }
}

export default async function handler(req, res) {
  const { prompt } = req.body;

  const commands = {
    'run testbot': 'testbot',
    'trigger techbot': 'techbot',
    'restart frontend': 'restartFrontend',
    'update managerbot': 'managerbot',
    'trigger codegenbot': 'codegenbot'
  };

  for (const key in commands) {
    if (prompt.toLowerCase().includes(key)) {
      const result = await fetch('http://localhost:3000/api/admin/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bot: commands[key] })
      });

      const data = await result.json();
      return res.json({
        reply: `✅ Command recognized: "${key}".\n\nResult:\n${data.output || 'Success'}`
      });
    }
  }

  // Default: ask Ollama
  const logs = require('fs').readFileSync('/root/.pm2/logs/managerbot-cron-out.log', 'utf-8');
  const fullPrompt = `System logs:\n${logs}\n\nQuestion: ${prompt}`;

  try {
    const ollamaRes = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'mistral', prompt: fullPrompt, stream: false })
    });

    const json = await ollamaRes.json();
    res.json({ reply: json.response });
  } catch (err) {
    res.status(500).json({ reply: '❌ Error querying Ollama: ' + err.message });
  }
}

import { exec } from 'child_process'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { bot, prompt } = req.body
  if (!bot || !prompt) return res.status(400).json({ error: 'Missing bot or prompt' })

  const botPath = `/mnt/data/AIOS-core/bots/${bot}/main.py`

  const cmd = `python3 ${botPath} "${prompt.replace(/"/g, '\\"')}"`

  exec(cmd, { timeout: 30000 }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: 'Execution failed', detail: stderr || error.message })
    }
    res.status(200).json({ output: stdout.trim() })
  })
}

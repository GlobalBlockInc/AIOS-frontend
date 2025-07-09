import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const botsDir = '/mnt/data/AIOS-core/bots/'
  try {
    const entries = fs.readdirSync(botsDir, { withFileTypes: true })
    const bots = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => entry.name)
    res.status(200).json({ bots })
  } catch (err) {
    res.status(500).json({ error: 'Failed to list bots', detail: err.message })
  }
}

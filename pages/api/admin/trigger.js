export default async function handler(req, res) {
  const { bot } = req.body;
  const { exec } = require('child_process');

  const commands = {
    managerbot: 'curl -X POST http://localhost:3001/api/managerbot/self-update',
    testbot: 'npm run test',
    techbot: 'node /root/AIOS-core/bots/techbot.js',
    codegenbot: 'curl -X POST http://localhost:3001/api/managerbot/trigger/codegenbot',
    restartFrontend: 'pm2 restart frontend'
  };

  if (!commands[bot]) {
    return res.status(400).json({ error: 'Unknown bot or action.' });
  }

  exec(commands[bot], (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr || err.message });
    }
    res.json({ success: true, output: stdout });
  });
}

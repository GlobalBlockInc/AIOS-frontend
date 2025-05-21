export default async function handler(req, res) {
  const { exec } = require('child_process');
  exec("tail -n 100 /root/.pm2/logs/*.log", (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr || err.message });
    res.status(200).json({ logs: stdout.split('\n') });
  });
}

export default async function handler(req, res) {
  const logFiles = [
    '/root/.pm2/logs/managerbot-cron-out.log',
    '/root/.pm2/logs/techbot-cron-out.log',
    '/root/.pm2/logs/testbot-cron-out.log',
    '/root/.pm2/logs/websitetestbot-cron-out.log',
  ];

  let output = [];
  for (let path of logFiles) {
    try {
      const log = require('fs').readFileSync(path, 'utf-8').split('\n').slice(-20);
      output.push(`--- ${path} ---`, ...log);
    } catch (err) {
      output.push(`Error reading ${path}: ${err.message}`);
    }
  }

  res.json({ logs: output });
}

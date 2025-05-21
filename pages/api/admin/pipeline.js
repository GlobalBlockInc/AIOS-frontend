export default async function handler(req, res) {
  const { exec } = require('child_process');

  const steps = [
    { name: 'ManagerBot', command: 'curl -X POST http://localhost:3001/api/managerbot/self-update' },
    { name: 'CodeGenBot', command: 'curl -X POST http://localhost:3001/api/managerbot/trigger/codegenbot' },
    { name: 'TestBot', command: 'npm run test' }
  ];

  const results = [];

  for (let step of steps) {
    results.push(`➡️ Running ${step.name}...`);
    try {
      const output = require('child_process').execSync(step.command).toString();
      results.push(`✅ ${step.name} complete:\n${output}`);
    } catch (err) {
      results.push(`❌ ${step.name} failed:\n${err.message}`);
    }
  }

  res.status(200).json({ output: results });
}

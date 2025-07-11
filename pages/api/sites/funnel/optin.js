const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, slug } = req.body;

  const leadFile = `/mnt/data/thrivesites/${slug}/leads.json`;
  let leads = [];

  if (fs.existsSync(leadFile)) {
    leads = JSON.parse(fs.readFileSync(leadFile));
  }

  leads.push({
    email,
    joinedAt: new Date().toISOString(),
  });

  fs.writeFileSync(leadFile, JSON.stringify(leads, null, 2));

  return res.status(200).json({ success: true, redirectTo: `/sites/${slug}/funnel?success=1` });
}

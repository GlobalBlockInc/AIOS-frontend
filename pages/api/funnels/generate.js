const fs = require('fs');
const path = require('path');
const { generateFunnelContent } = require('../../../../AIOS-core/bots/utils/funnel_generator');

export default async function handler(req, res) {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Missing topic' });

  const slug = topic.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const dir = path.join('/mnt/data/thrivesites/', slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const funnelData = await generateFunnelContent(topic);
  fs.writeFileSync(path.join(dir, 'funnel.json'), JSON.stringify(funnelData, null, 2));

  res.status(200).json({ success: true, slug });
}

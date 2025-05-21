let attempts = {};
const WINDOW = 5 * 60 * 1000; // 5 min
const MAX_ATTEMPTS = 5;

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Clean old entries
  for (const addr in attempts) {
    if (Date.now() - attempts[addr].time > WINDOW) delete attempts[addr];
  }

  if (!attempts[ip]) attempts[ip] = { count: 0, time: Date.now() };
  if (attempts[ip].count >= MAX_ATTEMPTS) {
    return res.status(429).json({ error: 'Too many attempts. Try again later.' });
  }

  const { password } = req.body;
  if (password === process.env.ADMIN_SECRET) {
    attempts[ip].count = 0;
    return res.status(200).json({ success: true });
  } else {
    attempts[ip].count++;
    return res.status(401).json({ error: 'Invalid password' });
  }
}

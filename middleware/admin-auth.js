export default function adminAuth(req, res, next) {
  const secret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
  const userSecret = req.headers['x-admin-secret'];

  if (!userSecret || userSecret !== secret) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  return next(); // Important to return
}

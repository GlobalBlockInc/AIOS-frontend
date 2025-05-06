const express = require('express');
const router = express.Router();

// TEMP ADMIN PASSPHRASE
const PASSPHRASE = process.env.ADMIN_PASSPHRASE || 'founder-access';

// Simple middleware for access
router.use((req, res, next) => {
  const passphrase = req.query.passphrase;

  if (passphrase !== PASSPHRASE) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
});

// Admin Home
router.get('/', (req, res) => {
  res.json({
    status: "AIOS Admin Panel Ready",
    routes: [
      "/bots/status",
      "/logs/latest",
      "/system/health"
    ]
  });
});

// Bots Status (placeholder, add real logic later)
router.get('/bots/status', (req, res) => {
  res.json({
    managerBot: "✅ Running",
    creatorBot: "✅ Running",
    testBot: "✅ Running",
    marketingBot: "✅ Running"
  });
});

// Latest Logs (optional for later)
router.get('/logs/latest', (req, res) => {
  res.json({ log: "No logs yet (placeholder)" });
});

// System Health
router.get('/system/health', (req, res) => {
  res.json({ status: "✅ All systems nominal." });
});

module.exports = router;
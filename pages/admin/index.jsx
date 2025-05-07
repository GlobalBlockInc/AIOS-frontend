// pages/admin/index.jsx

import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>AIOS Empire Admin Panel</h1>
      <p>Manage everything from one location.</p>

      <h2>Quick Access:</h2>
      <ul>
        <li><Link href="/admin/owner">Owner Dashboard</Link></li>
        <li><Link href="/admin/growth">AI Growth + Expansion</Link></li>
        <li><Link href="/admin/marketing">Marketing Automation</Link></li>
        <li><Link href="/admin/seedbots">SeedBots Manager</Link></li>
        <li><Link href="/admin/assistant">AIOS Assistant (Smart Commands)</Link></li>
      </ul>

      <h2>System Status:</h2>
      <p>✅ AIOS Core Server Connected</p>
      <p>✅ VPS + Local AI Powered</p>
      <p>✅ Ultra Director Mode: ACTIVE</p>
      <p>✅ Security Mode: AIOS SHIELD (Global Tier)</p>
    </div>
  );
}
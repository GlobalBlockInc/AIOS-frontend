import React from "react";
import Link from "next/link";

export default function AdminHome() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>AIOS Admin Dashboard</h1>
      <ul>
        <li><Link href="/admin/owner">Owner Control</Link></li>
        <li><Link href="/admin/assistant">AI Assistant</Link></li>
        <li><Link href="/admin/growth">Growth + Planner</Link></li>
        <li><Link href="/admin/marketing">Marketing AI</Link></li>
        <li><Link href="/admin/seedbots">SeedBots + Suggestions</Link></li>
      </ul>
    </div>
  );
}
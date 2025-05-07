// pages/index.jsx

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to AIOS Empire</h1>
      <p>The ultimate platform for AI-powered business growth and security.</p>

      <h2>Explore:</h2>
      <ul>
        <li><Link href="/marketplace">Marketplace</Link></li>
        <li><Link href="/nodes">Node Partner Program</Link></li>
        <li><Link href="/shield">AIOS Shield Security</Link></li>
        <li><Link href="/solostack">SoloStack Website Builder</Link></li>
        <li><Link href="/admin">Admin Dashboard</Link></li>
      </ul>
    </div>
  );
}
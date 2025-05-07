import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Thriveomate AI OS</h1>
      <p>Your AI Business + Automation + Empire Builder</p>

      <h2>Quick Links</h2>
      <ul style={{ listStyle: "none" }}>
        <li><Link href="/solostack">SoloStack Website Creator</Link></li>
        <li><Link href="/shield">AI Shield Security</Link></li>
        <li><Link href="/partners">Partner Program</Link></li>
        <li><Link href="/marketplace">AI Marketplace</Link></li>
        <li><Link href="/nodes">Node Provider Info</Link></li>
        <li><Link href="/admin">Admin Dashboard</Link></li>
      </ul>
    </div>
  );
}
import { useEffect, useState } from "react";

export default function MarketingPanel() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("/api/marketing")
      .then(res => res.json())
      .then(data => setCampaigns(data.campaigns));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>AIOS Marketing Campaigns</h1>
      <ul>
        {campaigns.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

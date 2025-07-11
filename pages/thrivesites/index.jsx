import { useEffect, useState } from 'react';

export default function ThriveSitesPage() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch('/api/backend-proxy/thrivesites')
      .then(res => res.json())
      .then(data => setSites(data.sites || []));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🌐 ThriveSites Marketplace</h1>
      <p>Browse live AI-powered sites rented by small businesses.</p>
      <ul>
        {sites.map((site, idx) => (
          <li key={idx}>
            <strong>{site.name}</strong> — <a href={`https://${site.slug}.thriveomate.com`} target="_blank" rel="noreferrer">{site.slug}.thriveomate.com</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function ThriveSitesAdmin() {
  const [sites, setSites] = useState([]);
  const [form, setForm] = useState({ name: '', slug: '', ownerEmail: '' });

  const fetchSites = () => {
    fetch('/api/backend-proxy/thrivesites')
      .then(res => res.json())
      .then(data => setSites(data.sites || []));
  };

  const createSite = async () => {
    const res = await fetch('/api/backend-proxy/thrivesites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: '', slug: '', ownerEmail: '' });
      fetchSites();
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛠️ ThriveSites Admin</h2>
      <div>
        <input placeholder="Business Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Subdomain (slug)" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
        <input placeholder="Owner Email" value={form.ownerEmail} onChange={e => setForm({ ...form, ownerEmail: e.target.value })} />
        <button onClick={createSite}>Create ThriveSite</button>
      </div>
      <ul>
        {sites.map((site, idx) => (
          <li key={idx}>{site.name} — {site.slug}.thriveomate.com</li>
        ))}
      </ul>
    </div>
  );
}

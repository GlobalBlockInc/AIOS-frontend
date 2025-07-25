'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const tabs = [
  'Overview',
  'ThriveMind',
  'ThriveSites',
  'Bots',
  'GlobalBlockInc',
  'Logs',
  'AssistantBot',
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('Overview');
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const password = prompt('Enter admin password:');
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'thrive1234')) {
      setAuthorized(true);
    } else {
      alert('Unauthorized');
      router.push('/');
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Unified Admin Dashboard</h1>
      <div className="flex space-x-2 mb-6">
        {tabs.map((t) => (
          <Button key={t} variant={tab === t ? 'default' : 'outline'} onClick={() => setTab(t)}>
            {t}
          </Button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-xl">
        {tab === 'Overview' && <OverviewTab />}
        {tab === 'ThriveMind' && <ThriveMindTab />}
        {tab === 'ThriveSites' && <ThriveSitesTab />}
        {tab === 'Bots' && <BotsTab />}
        {tab === 'GlobalBlockInc' && <GlobalBlockIncTab />}
        {tab === 'Logs' && <LogsTab />}
        {tab === 'AssistantBot' && <AssistantBotTab />}
      </div>
    </div>
  );
}

const OverviewTab = () => {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetch('/app/api/admin/system-status')
      .then((res) => res.json())
      .then(setStats);
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Company Snapshot</h2>
      {stats ? (
        <ul className="list-disc ml-6">
          <li>Uptime: {stats.uptime}</li>
          <li>Total Revenue: ${stats.total_revenue}</li>
          <li>Active Sites: {stats.active_sites}</li>
        </ul>
      ) : (
        <p>Loading system snapshot...</p>
      )}
    </div>
  );
};

const ThriveMindTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">ThriveMind (AGI)</h2>
    <p>Memory viewer, goal injector, AGI loop monitor...</p>
  </div>
);

const ThriveSitesTab = () => {
  const [sites, setSites] = useState([]);
  useEffect(() => {
    fetch('/app/api/admin/thrivesites')
      .then((res) => res.json())
      .then(setSites);
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">ThriveSites</h2>
      {sites.length > 0 ? (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Site</th>
              <th className="p-2 border">Subdomain</th>
              <th className="p-2 border">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((s, i) => (
              <tr key={i}>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.subdomain}</td>
                <td className="p-2 border">${s.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading ThriveSites data...</p>
      )}
    </div>
  );
};

const BotsTab = () => {
  const [bots, setBots] = useState([]);
  useEffect(() => {
    fetch('/app/api/bots/manager')
      .then((res) => res.json())
      .then(setBots);
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">AI Bots</h2>
      {bots.length > 0 ? (
        <ul className="list-disc ml-6">
          {bots.map((b, i) => (
            <li key={i}>{b.name} – {b.status}</li>
          ))}
        </ul>
      ) : (
        <p>Loading bot statuses...</p>
      )}
    </div>
  );
};

const GlobalBlockIncTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">GlobalBlock Infrastructure</h2>
    <p>Node contributions, bandwidth, storage, payouts...</p>
  </div>
);

const LogsTab = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    fetch('/app/api/admin/logs')
      .then((res) => res.json())
      .then(setLogs);
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">System Logs</h2>
      <div className="bg-black text-white rounded p-2 h-64 overflow-y-auto">
        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
};

const AssistantBotTab = () => {
  const [input, setInput] = useState('');
  const [log, setLog] = useState([]);
  const send = async () => {
    const res = await fetch('/app/api/assistant', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setLog((prev) => [...prev, { role: 'user', content: input }, { role: 'assistant', content: data.reply }]);
    setInput('');
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">AssistantBot</h2>
      <div className="border rounded p-2 h-64 overflow-y-auto mb-2">
        {log.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block px-2 py-1 rounded ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{m.content}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input className="border flex-1 p-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the AssistantBot..." />
        <button className="bg-purple-600 text-white px-4 rounded" onClick={send}>Send</button>
      </div>
    </div>
  );
};

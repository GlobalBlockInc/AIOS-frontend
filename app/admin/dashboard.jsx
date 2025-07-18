import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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

const AdminDashboard = () => {
  const [tab, setTab] = useState('Overview');
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simple password check using environment variable
    const password = prompt('Enter admin password:');
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
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
};

export default AdminDashboard;

const OverviewTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">Company Snapshot</h2>
    <p>Live earnings, node status, memory usage, loop state, user stats...</p>
  </div>
);

const ThriveMindTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">ThriveMind (AGI)</h2>
    <p>Memory viewer, goal injector, AGI loop monitor...</p>
  </div>
);

const ThriveSitesTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">ThriveSites</h2>
    <p>Site traffic, creator earnings, referral status, domains...</p>
  </div>
);

const BotsTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">AI Bots</h2>
    <p>Status, uptime, restart controls, swarm links...</p>
  </div>
);

const GlobalBlockIncTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">GlobalBlock Infrastructure</h2>
    <p>Node contributions, bandwidth, storage, payouts...</p>
  </div>
);

const LogsTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">System Logs</h2>
    <p>Email logs, system actions, bot replies, AGI output...</p>
  </div>
);

const AssistantBotTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">AssistantBot</h2>
    <p>Chat window with ThriveBot (MiniMax-powered) coming next...</p>
  </div>
);

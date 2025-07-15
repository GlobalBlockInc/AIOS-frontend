'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const SESSION_DURATION_MINUTES = 30;

export default function AdminControlPanel() {
  const [authorized, setAuthorized] = useState(false);
  const [sites, setSites] = useState([]);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantLog, setAssistantLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const secret = localStorage.getItem('admin-secret');
    const loginTime = localStorage.getItem('admin-login-time');
    const expected = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'thrive1234';

    if (!secret || secret !== expected) {
      router.push('/admin-login');
      return;
    }

    if (loginTime) {
      const diff = (Date.now() - parseInt(loginTime)) / 1000 / 60;
      if (diff > SESSION_DURATION_MINUTES) {
        localStorage.removeItem('admin-secret');
        localStorage.removeItem('admin-email');
        localStorage.removeItem('admin-login-time');
        router.push('/admin-login');
        return;
      } else {
        setTimeLeft(Math.round(SESSION_DURATION_MINUTES - diff));
      }
    }

    setAuthorized(true);
  }, []);

  useEffect(() => {
    if (!authorized) return;

    fetch('/api/admin/thrivesites')
      .then(res => res.json())
      .then(data => {
        setSites(data || []);
        setLoading(false);
      });

    fetch('/api/admin/assistant-log')
      .then(res => res.json())
      .then(log => setAssistantLog(log || []));
  }, [authorized]);

  const handleAssistant = async () => {
    if (!assistantInput.trim()) return;

    setAssistantLog(prev => [...prev, { role: 'user', content: assistantInput }]);

    const res = await fetch('/api/assistant', {
      method: 'POST',
      body: JSON.stringify({ message: assistantInput }),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    setAssistantLog(prev => [...prev, { role: 'assistant', content: json.reply }]);
    setAssistantInput('');
  };

  const logout = () => {
    localStorage.removeItem('admin-secret');
    localStorage.removeItem('admin-email');
    localStorage.removeItem('admin-login-time');
    router.push('/admin-login');
  };

  const labels = sites.map(s => s.created_at);
  const revenueData = sites.map(s => s.monthly_revenue || 0);
  const visitsData = sites.map(s => s.visits_today || 0);
  const conversions = sites.map(s => s.conversion_rate || 0);

  if (!authorized) return null;

  return (
    <div className="flex min-h-screen text-sm">
      {/* AssistantBot Sidebar */}
      <aside className="w-96 bg-black text-white p-4 flex flex-col space-y-4">
        <h2 className="text-xl font-bold">AssistantBot</h2>
        <div className="text-xs text-gray-300">
          Session expires in <span className="font-bold">{timeLeft} min</span>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-800 rounded p-2 space-y-2">
          {assistantLog.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <div className={`inline-block px-3 py-2 rounded ${msg.role === 'user' ? 'bg-purple-600' : 'bg-gray-700'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            value={assistantInput}
            onChange={(e) => setAssistantInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAssistant()}
            className="flex-1 px-2 py-1 rounded text-black"
            placeholder="Ask anything..."
          />
          <button onClick={handleAssistant} className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700">Send</button>
        </div>
        <button onClick={logout} className="bg-red-600 px-3 py-2 rounded hover:bg-red-700 mt-4">Logout</button>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6 space-y-10 bg-gray-50 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Thriveomate Admin Control Panel</h1>

        {/* Revenue */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Daily Revenue</h2>
          <Line data={{
            labels,
            datasets: [{
              label: 'Revenue ($)',
              data: revenueData,
              fill: false,
              borderColor: 'purple',
              tension: 0.3
            }]
          }} />
        </section>

        {/* Visitors */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Visitor Traffic</h2>
          <Bar data={{
            labels,
            datasets: [{
              label: 'Visitors',
              data: visitsData,
              backgroundColor: 'rgba(99, 102, 241, 0.6)'
            }]
          }} />
        </section>

        {/* Conversion */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Conversion Rates</h2>
          <Line data={{
            labels,
            datasets: [{
              label: 'Conversion Rate (%)',
              data: conversions,
              fill: true,
              backgroundColor: 'rgba(34,197,94,0.2)',
              borderColor: 'green',
              tension: 0.4
            }]
          }} />
        </section>

        {/* ThriveSites Summary Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Active ThriveSites</h2>
          <table className="w-full table-auto border border-gray-300 text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Site</th>
                <th className="p-2 border">Subdomain</th>
                <th className="p-2 border">Revenue</th>
                <th className="p-2 border">Visitors</th>
                <th className="p-2 border">Conversion</th>
                <th className="p-2 border">Creator</th>
                <th className="p-2 border">Referrer</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">{site.site_name}</td>
                  <td className="p-2 border text-blue-600">{site.subdomain}</td>
                  <td className="p-2 border">${site.monthly_revenue.toFixed(2)}</td>
                  <td className="p-2 border">{site.visits_today}</td>
                  <td className="p-2 border">{site.conversion_rate}%</td>
                  <td className="p-2 border">{site.creator}</td>
                  <td className="p-2 border">{site.referrer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const [isAuthed, setIsAuthed] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const login = async () => {
  try {
    await axios.get("/api/admin/stats", {
      auth: { username, password }
    });
    setIsAuthed(true);
    axios.defaults.auth = { username, password }; // persist creds for all API calls
  } catch {
    alert("Invalid credentials");
  }
};

if (!isAuthed) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login} className="w-full bg-blue-700 text-white p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState<any>({});
  const [apps, setApps] = useState<any[]>([]);
  const [assistant, setAssistant] = useState<any>(null);
  const [autoCreate, setAutoCreate] = useState(true);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    fetchStats();
    fetchApps();
    fetchAssistant();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get("/api/marketplace/list");
    setStats({
      totalApps: res.data.length,
      activeApps: res.data.filter((a: any) => a.status === "active").length,
    });
  };

  const fetchApps = async () => {
    const res = await axios.get("/api/marketplace/list");
    setApps(res.data);
  };

  const fetchAssistant = async () => {
    const res = await axios.get("/api/assistantbot/suggest");
    setAssistant(res.data);
  };

  const toggleAutoCreate = async () => {
    const newStatus = !autoCreate;
    await axios.post("/api/assistantbot/toggle", { enabled: newStatus });
    setAutoCreate(newStatus);
  };

  const sendChat = async () => {
  const res = await axios.post("/api/assistantbot/chat", { message: chatInput });
  alert(res.data.response);
  setChatInput("");
  };

  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Admin Dashboard</h1>
      <div className="flex justify-center space-x-4 mb-8">
        {["overview", "marketplace", "revenue", "assistant"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded ${tab === t ? "bg-blue-700 text-white" : "bg-white text-blue-700 border"}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Total Apps</h3>
              <p className="text-3xl">{stats.totalApps}</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Active Apps</h3>
              <p className="text-3xl">{stats.activeApps}</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Monthly Revenue</h3>
              <p className="text-3xl">$0 (Test Mode)</p>
            </div>
          </div>
        </section>
      )}

      {tab === "marketplace" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Marketplace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {apps.map((app, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <img src={app.thumbnail} className="w-full h-32 object-cover rounded" />
                <h3 className="text-lg font-semibold mt-2">{app.name}</h3>
                <p className="text-gray-600">{app.category}</p>
                <p className="text-sm text-gray-500 mt-2">{app.description}</p>
                <p className={`mt-2 text-sm ${app.status === "active" ? "text-green-600" : "text-red-600"}`}>
                  {app.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "revenue" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Revenue</h2>
          <p>Stripe test mode: No live revenue yet.</p>
        </section>
      )}

      {tab === "assistant" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">AssistantBot</h2>
          <div className="bg-white p-6 rounded shadow mb-6">
            <p className="mb-4">
              <strong>Auto-Creation:</strong> {autoCreate ? "Enabled" : "Disabled"}
            </p>
            <button onClick={toggleAutoCreate} className="px-4 py-2 bg-blue-700 text-white rounded">
              {autoCreate ? "Disable" : "Enable"} Auto-Creation
            </button>
          </div>
          <div className="bg-white p-6 rounded shadow mb-6">
            <h3 className="text-lg font-semibold mb-2">AI Suggestions</h3>
            {assistant ? (
              <div>
                <p><strong>Idea:</strong> {assistant.name || "N/A"}</p>
                <p><strong>Why:</strong> {assistant.description || "No detailed reason."}</p>
                <p><strong>Confidence:</strong> {assistant.confidence || 0}%</p>
              </div>
            ) : (
              <p>Loading suggestions...</p>
            )}
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Chat with AssistantBot</h3>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Ask AssistantBot something..."
            />
            <button onClick={sendChat} className="px-4 py-2 bg-blue-700 text-white rounded">
              Send
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

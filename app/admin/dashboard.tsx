"use client";
import { useState } from "react";
import OverviewTab from "@/components/tabs/OverviewTab";
import ThriveSitesTab from "@/components/tabs/ThriveSitesTab";
import BotsTab from "@/components/tabs/BotsTab";
import MemoryTab from "@/components/tabs/MemoryTab";
import LogsTab from "@/components/tabs/LogsTab";
import AssistantTab from "@/components/tabs/AssistantTab";

useEffect(() => {
    const password = prompt('Enter admin password:');
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'thrive1234')) {
      setAuthorized(true);
    } else {
      alert('Unauthorized');
      router.push('/');
    }
  
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Business Overview" },
    { id: "thrivesites", label: "ThriveSites" },
    { id: "bots", label: "Bots" },
    { id: "memory", label: "ThriveMind" },
    { id: "logs", label: "Logs" },
    { id: "assistant", label: "AssistantBot" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />;
      case "thrivesites": return <ThriveSitesTab />;
      case "bots": return <BotsTab />;
      case "memory": return <MemoryTab />;
      case "logs": return <LogsTab />;
      case "assistant": return <AssistantTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{renderTab()}</div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Thriveomate Admin Dashboard</h1>
      </header>
      <nav className="bg-gray-200 px-4 py-2 flex gap-4 text-sm">
        <a href="/admin">📊 Dashboard</a>
        <a href="/admin/thrivesites">🌐 ThriveSites</a>
        <a href="/admin/bots">🤖 Bot Clicks</a>
        <a href="/admin/assistant">💬 AssistantBot</a>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  )
}

import { checkAdmin } from '@/middleware/admin-auth'

export default function AdminHome({ searchParams }) {
  if (!checkAdmin({ url: `?auth=${searchParams?.auth}` })) return <div>❌ Unauthorized</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">📊 Admin Overview</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Live ThriveSites deployed</li>
        <li>Bot rentals tracked</li>
        <li>Referral earnings tracked</li>
        <li>AssistantBot support enabled</li>
      </ul>
    </div>
  )
}

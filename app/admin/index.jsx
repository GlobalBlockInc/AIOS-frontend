// AIOS-frontend/app/admin/index.jsx
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminHome() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Thriveomate Admin Panel</h1>

      <Card>
        <CardContent className="space-y-2">
          <p className="font-semibold">Quick Access:</p>
          <ul className="list-disc pl-5 space-y-1 text-blue-600">
            <li><Link href="/admin/dashboard">System Controls Dashboard</Link></li>
            <li><Link href="/admin/manager">ManagerBot Command Console</Link></li>
            <li><Link href="/admin/logs">Bot Logs Viewer</Link></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
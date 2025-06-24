'use client';
import { useEffect, useState } from 'react';
import DashboardEditor from '@/components/DashboardEditor';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [html, setHtml] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadSite() {
      const res = await fetch('/api/site');
      const data = await res.json();

      if (data && data.paid && data.html) {
        setHtml(data.html);
      } else {
        router.push('/pricing');
      }
    }

    loadSite();
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Website Dashboard</h1>
      {html ? (
        <DashboardEditor html={html} />
      ) : (
        <p>Loading site...</p>
      )}
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SystemStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/app/api/admin/system-status');
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error('Failed to fetch system status:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleAudit = async () => {
    setLoading(true);
    try {
      await fetch('/app/api/admin/system-audit', { method: 'POST' });
      await fetchStatus();
    } catch (err) {
      console.error('Failed to run system audit:', err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">System Status</h2>
          {loading && <p>Loading...</p>}
          {status && (
            <div className="space-y-2">
              <p><strong>Backend:</strong> {status.backend}</p>
              <p><strong>Frontend:</strong> {status.frontend}</p>
              <p><strong>AI Chat:</strong> {status.aiChat}</p>
              <p><strong>Memory Usage:</strong> {status.memory}</p>
              <p><strong>Last Check:</strong> {status.lastCheck}</p>
              <p><strong>Recent Log:</strong> {status.logTail}</p>
            </div>
          )}
          <Button onClick={handleAudit} className="mt-4">
            Run Full Audit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem('admin_auth', password);
    router.push('/admin/system-status');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Login</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

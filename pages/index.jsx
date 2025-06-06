import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Thriveomate</h1>
      <p className="text-lg text-gray-700">The AI business automation platform for solopreneurs and small teams.</p>
      <a href="/admin/login" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go to Admin
      </a>
    </main>
  );
}

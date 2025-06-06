import React from 'react';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-700">Oops! The page you're looking for doesn’t exist.</p>
      <a href="/" className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go Home
      </a>
    </div>
  );
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-gray-800">
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">Sorry, the page you’re looking for doesn’t exist.</p>
        <a href="/" className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Go back home
        </a>
      </div>
    </main>
  );
}

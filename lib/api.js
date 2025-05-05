export async function apiFetch(path, options = {}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Backend URL is not defined in .env.local");
  }

  const res = await fetch(`${backendUrl}${path}`, options);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error: ${error}`);
  }

  return res.json();
}

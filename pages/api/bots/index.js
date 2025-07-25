export default async function handler(req, res) {
  try {
    const response = await fetch("http://localhost:8000/api/bots");
    if (!response.ok) throw new Error("Failed to fetch bot list");
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

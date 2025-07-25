export default async function handler(req, res) {
  try {
    const response = await fetch("http://localhost:8000/api/admin/memory");
    if (!response.ok) throw new Error("Failed to fetch memory data");
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

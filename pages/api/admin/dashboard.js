export default async function handler(req, res) {
  try {
    const response = await fetch("http://localhost:8000/api/admin/dashboard");
    if (!response.ok) throw new Error("Failed to fetch dashboard data");
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

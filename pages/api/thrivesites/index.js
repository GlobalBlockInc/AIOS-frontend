export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch("http://localhost:8000/api/thrivesites");
      if (!response.ok) throw new Error("Failed to fetch ThriveSites");
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

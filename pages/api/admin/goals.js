export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch("http://localhost:8000/api/admin/goals");
      if (!response.ok) throw new Error("Failed to fetch goals");
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const payload = JSON.parse(req.body);
      const response = await fetch("http://localhost:8000/api/admin/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to update goals");
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

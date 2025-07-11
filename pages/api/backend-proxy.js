export default async function handler(req, res) {
  const result = await fetch(`http://localhost:3001/api/ping`);
  const data = await result.json();
  res.status(200).json(data);
}

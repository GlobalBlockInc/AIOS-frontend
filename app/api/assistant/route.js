export async function POST(req) {
  const { message } = await req.json();
  // Echo back assistant response
  return new Response(
    JSON.stringify({ reply: `Assistant received: ${message}` }),
    { headers: { "Content-Type": "application/json" } }
  );
}

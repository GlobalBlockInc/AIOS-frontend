export async function GET() {
  // Example: Admin dashboard stats
  return new Response(
    JSON.stringify({
      status: "ok",
      users: 120,
      bots: 10,
      sites: 25,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}

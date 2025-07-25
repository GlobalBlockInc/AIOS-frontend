export async function GET() {
  // Example: Bots list
  return new Response(
    JSON.stringify({
      bots: [
        { name: "WordBot", status: "running" },
        { name: "CodeGenBot", status: "idle" },
      ],
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}

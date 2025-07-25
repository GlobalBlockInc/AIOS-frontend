export async function GET() {
  // Example: WordBot status endpoint
  return new Response(JSON.stringify({ status: "ok", wordsAdded: 12345 }), {
    headers: { "Content-Type": "application/json" },
  });
}

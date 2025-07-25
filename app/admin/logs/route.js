export async function GET() {
  return Response.json([
    "Server started at " + new Date().toISOString(),
    "Health check OK",
    "Bots running smoothly"
  ]);
}

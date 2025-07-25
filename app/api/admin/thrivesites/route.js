export async function GET() {
  return Response.json([
    { name: 'SparkClean', subdomain: 'sparkclean', revenue: 120 },
    { name: 'TreePro', subdomain: 'treepro', revenue: 250 },
  ]);
}

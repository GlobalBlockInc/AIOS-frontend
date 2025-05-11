export function middleware(req) {
  const url = req.nextUrl;
  const pass = req.headers.get("x-admin-pass");

  if (!pass || pass !== "founder-access") {
    return new Response("Unauthorized", { status: 401 });
  }

  return;
}

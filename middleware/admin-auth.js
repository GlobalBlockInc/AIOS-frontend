export function checkAdmin({ url }) {
  const urlParams = new URLSearchParams(url.split('?')[1])
  const authParam = urlParams.get('auth')
  return authParam === process.env.NEXT_PUBLIC_ADMIN_SECRET
}

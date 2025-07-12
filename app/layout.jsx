export const metadata = {
  title: 'Thriveomate',
  description: 'Your AI Business Engine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

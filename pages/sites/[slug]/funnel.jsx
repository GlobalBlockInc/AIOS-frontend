import fs from 'fs';
import path from 'path';

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const filePath = `/mnt/data/thrivesites/${slug}/funnel.json`;
  if (!fs.existsSync(filePath)) return { notFound: true };

  const funnel = JSON.parse(fs.readFileSync(filePath));
  return { props: { funnel, slug } };
}

export default function SiteFunnel({ funnel, slug }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{funnel.title}</h1>
      <p>{funnel.subtitle}</p>
      <form action="/api/sites/funnel/optin" method="POST">
        <input type="hidden" name="slug" value={slug} />
        <input name="email" placeholder="Your email" required />
        <button type="submit">{funnel.callToAction}</button>
      </form>
    </div>
  );
}

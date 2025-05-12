import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PreviewSitePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [iframeUrl, setIframeUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const testUrl = `/sites/solostack/${slug}/index.html`;

    // Check if the site exists before loading
    fetch(testUrl)
      .then(res => {
        if (res.ok) {
          setIframeUrl(testUrl);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div style={errorStyle}>
        <h2>Site Not Found</h2>
        <p>We couldn’t find a site with that name. Try again or contact support.</p>
      </div>
    );
  }

  return iframeUrl ? (
    <iframe
      src={iframeUrl}
      title="Site Preview"
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  ) : (
    <p style={{ padding: "40px", textAlign: "center" }}>Loading site preview...</p>
  );
}

const errorStyle = {
  padding: "60px",
  textAlign: "center",
  fontFamily: "sans-serif"
};

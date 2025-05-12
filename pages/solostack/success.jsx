import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteSuccessPage() {
  const router = useRouter();
  const { name, slug } = router.query;
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => {
    if (slug) {
      setSiteUrl(`/preview/${slug}`);
    }
  }, [slug]);

  return (
    <div style={{ padding: "60px 20px", maxWidth: "800px", margin: "auto", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Success!</h1>
      <p style={{ fontSize: "1.2em" }}>
        Your site <strong>{name || "..."}</strong> has been created.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link href={siteUrl}>
          <a style={btnStyle}>Preview Your Site</a>
        </Link>
      </div>

      <p style={{ marginTop: "40px", color: "#555" }}>
        Want to generate another site or upgrade this one? Go to your <Link href="/dashboard">Dashboard</Link>.
      </p>
    </div>
  );
}

const btnStyle = {
  padding: "14px 28px",
  backgroundColor: "#0070f3",
  color: "#fff",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "1em"
};

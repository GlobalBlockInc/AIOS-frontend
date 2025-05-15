import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free (Demo Access)",
      price: "$0/month",
      features: [
        "1 AI-generated site (preview only)",
        "Watermarked output",
        "Limited AI assistant access",
        "No custom domain",
      ],
      cta: "Start Free",
      stripe: "#", // Optional Stripe link or internal route
    },
    {
      name: "SoloStack Pro",
      price: "$29/month",
      features: [
        "Unlimited AI site generations",
        "Custom domain support",
        "Access to core AI tools",
        "AI GrowthBot + ShieldBot",
        "Full partner dashboard access",
      ],
      cta: "Upgrade to Pro",
      stripe: "https://buy.stripe.com/test_ProPlanLink", // Replace
    },
    {
      name: "SoloStack Business",
      price: "$99/month",
      features: [
        "All Pro features +",
        "Marketplace listing",
        "Done-for-you onboarding support",
        "Lead capture & AI AdBot",
        "ThriveFund support for clients",
      ],
      cta: "Join Business Tier",
      stripe: "https://buy.stripe.com/test_BusinessPlanLink", // Replace
    },
  ];

  return (
    <div style={{ padding: "60px 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Pricing Plans</h1>
      <p style={{ textAlign: "center", fontSize: "1.1em", maxWidth: "700px", margin: "auto" }}>
        Thriveomate grows with you — whether you're just testing your idea, launching your empire, or helping others thrive.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", marginTop: "50px" }}>
        {plans.map((plan, idx) => (
          <div key={idx} style={{ width: "300px", padding: "30px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#fafafa" }}>
            <h2>{plan.name}</h2>
            <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>{plan.price}</p>
            <ul>
              {plan.features.map((f, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>• {f}</li>
              ))}
            </ul>
            <a href={plan.stripe} style={{
              display: "block",
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: "#0070f3",
              color: "#fff",
              textAlign: "center",
              borderRadius: "6px",
              textDecoration: "none"
            }}>
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * API Route: /api/checkout
 * Method: POST
 * Body: { tier: 'starter' | 'pro' | 'platinum' | 'empire', userId: 'abc123' }
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { tier, userId } = body;

    if (!tier || !userId) {
      return new Response(JSON.stringify({ error: 'Missing tier or user ID.' }), { status: 400 });
    }

    const priceMap = {
      starter: process.env.STRIPE_STARTER_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID,
      platinum: process.env.STRIPE_PLATINUM_PRICE_ID,
      empire: process.env.STRIPE_EMPIRE_PRICE_ID,
    };

    const priceId = priceMap[tier];

    if (!priceId) {
      return new Response(JSON.stringify({ error: 'Invalid tier selected.' }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        tier,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return new Response(JSON.stringify({ error: 'Checkout failed.' }), { status: 500 });
  }
}
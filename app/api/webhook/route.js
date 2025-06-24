import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Path to your users.json file
const USERS_FILE = path.join(process.cwd(), 'core/data/users.json');

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  // ✅ Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    const priceId = session.metadata?.priceId || session?.line_items?.[0]?.price?.id;

    if (customerEmail) {
      const users = loadUsers();
      const existing = users.find((u) => u.email === customerEmail);

      if (existing) {
        existing.paid = true;
        existing.plan = priceId;
        existing.updatedAt = new Date().toISOString();
      } else {
        users.push({
          email: customerEmail,
          paid: true,
          plan: priceId,
          createdAt: new Date().toISOString(),
        });
      }

      saveUsers(users);
      console.log(`✅ Payment received for ${customerEmail}. Access granted.`);
    }
  }

  return new NextResponse('ok', { status: 200 });
}
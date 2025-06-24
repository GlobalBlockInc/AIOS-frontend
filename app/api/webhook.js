import Stripe from 'stripe';
import { buffer } from 'micro';
import fs from 'fs';
import path from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const usersFile = path.join(process.cwd(), 'core/data/users.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout session
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Extract user email
    const customerEmail = session.customer_email;

    if (customerEmail) {
      try {
        if (!fs.existsSync(usersFile)) {
          fs.writeFileSync(usersFile, JSON.stringify([]));
        }

        const users = JSON.parse(fs.readFileSync(usersFile));
        let user = users.find(u => u.email === customerEmail);

        if (user) {
          user.paid = true;
        } else {
          users.push({
            email: customerEmail,
            paid: true,
            created: new Date().toISOString()
          });
        }

        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
        console.log(`✅ Payment complete: access granted for ${customerEmail}`);
      } catch (error) {
        console.error('❌ Failed to update user after payment:', error);
      }
    }
  }

  res.status(200).json({ received: true });
}
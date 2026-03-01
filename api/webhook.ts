import Stripe from 'stripe';
import { sql } from '@vercel/postgres';
import { sendOrderEmails } from './mailer.js'; 

export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export default async function handler(req: any, res: any) {
  const sig = req.headers['stripe-signature'];
  const body = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent: any = event.data.object;
    const orderId = intent.metadata.orderId;

    try {
      const { rows } = await sql`
        UPDATE orders
        SET status = 'paid'
        WHERE id = ${orderId}
        RETURNING *;
      `;

      if (rows.length > 0) {
        const order = rows[0];
        
        let parsedItems = [];
        try {
            parsedItems = order.items ? JSON.parse(order.items) : [];
        } catch (e) {
            console.error(e);
        }

        try {
          await sendOrderEmails({
            orderId: order.id,
            total: order.total,
            customerEmail: order.email,
            firstName: order.imie,
            lastName: order.nazwisko,
            address: order.adres,
            city: order.miasto,
            postalCode: order.kod_pocztowy,
            phone: order.telefon,
            items: parsedItems
          });
        } catch (emailError) {
          console.error(emailError);
        }
      }
    } catch (dbError) {
      console.error(dbError);
      return res.status(500).json({ error: 'Database update failed' });
    }
  }

  res.json({ received: true });
}

async function buffer(req: any) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return Buffer.concat(chunks);
}

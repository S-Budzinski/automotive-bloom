import Stripe from 'stripe';
import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    email, imie, nazwisko,
    adres, miasto, kod_pocztowy,
    telefon, total,
    items
  } = req.body;

  const itemsJSON = JSON.stringify(items || []);

  const order = await sql`
    INSERT INTO orders (
      email, total, status, 
      imie, nazwisko, adres, miasto, kod_pocztowy, telefon, items
    )
    VALUES (
      ${email}, ${total}, 'pending',
      ${imie}, ${nazwisko}, ${adres},
      ${miasto}, ${kod_pocztowy}, ${telefon}, ${itemsJSON}
    )
    RETURNING id
  `;

  const orderId = order.rows[0].id;

  const intent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: 'pln',
    metadata: { orderId: String(orderId) },
    automatic_payment_methods: { enabled: true },
  });

  res.json({ clientSecret: intent.client_secret });
}
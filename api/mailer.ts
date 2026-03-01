import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface CartItem {
    name: string;
    quantity: number;
    price: number;
    isBundle?: boolean; 
}

interface OrderDetails {
  orderId: string;
  total: number;
  customerEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  items: CartItem[];
}

export async function sendOrderEmails(details: OrderDetails) {
  const { 
    orderId, total, customerEmail, firstName, lastName, 
    address, city, postalCode, phone, items
  } = details;

  const totalPLN = total;

  const productsHtml = items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px;">${item.name} ${item.isBundle ? '<span style="color:green; font-size:10px">(Pakiet)</span>' : ''}</td>
        <td style="padding: 8px; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; text-align: right;">${item.price} zł</td>
    </tr>
  `).join('');

  const productsTable = `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
        <thead>
            <tr style="background-color: #f8f8f8; text-align: left;">
                <th style="padding: 8px;">Produkt</th>
                <th style="padding: 8px; text-align: center;">Ilość</th>
                <th style="padding: 8px; text-align: right;">Cena</th>
            </tr>
        </thead>
        <tbody>
            ${productsHtml}
        </tbody>
    </table>
  `;

  await transporter.sendMail({
    from: `"Knevio" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: `Potwierdzenie zamówienia #${orderId} - Knevio`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #d4af37;">Dziękujemy za zamówienie!</h1>
        <p>Cześć ${firstName},</p>
        <p>Twoje zamówienie <strong>#${orderId}</strong> zostało opłacone.</p>
        
        <h3>Szczegóły zamówienia:</h3>
        ${productsTable} 
        
        <p><strong>Razem: ${totalPLN} zł</strong></p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888;">Zespół Knevio</p>
      </div>
    `,
  });

  await transporter.sendMail({
    from: `"Sklep Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `💰 Nowe zamówienie: ${totalPLN} zł (ID: ${orderId})`,
    html: `
      <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2da44e; margin-top: 0;">Nowe Opłacone Zamówienie!</h2>
        
        <div style="background-color: #f6f8fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 5px 0; font-size: 18px;"><strong>Kwota:</strong> ${totalPLN} PLN</p>
          <p style="margin: 5px 0;"><strong>ID:</strong> #${orderId}</p>
          <p style="margin: 5px 0;"><strong>Klient:</strong> ${firstName} ${lastName}</p>
        </div>

        <h3>📦 Zamówione produkty:</h3>
        ${productsTable}

        <h3>📍 Dane do wysyłki:</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Adres:</strong> ${address}</li>
          <li><strong>Miasto:</strong> ${postalCode} ${city}</li>
          <li><strong>Telefon:</strong> ${phone}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
        </ul>
      </div>
    `,
  });
}
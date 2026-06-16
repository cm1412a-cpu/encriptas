export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, email, amount, currency, nombre } = req.body || {};

  if (!token || !email) {
    return res.status(400).json({ error: 'token y email requeridos' });
  }

  const secretKey = process.env.CULQI_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'CULQI_SECRET_KEY no configurada en Vercel' });
  }

  try {
    const response = await fetch('https://api.culqi.com/v2/charges', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount:        amount    || 1000,
        currency_code: currency  || 'USD',
        email,
        source_id:     token,
        description:   'Encriptas - Proteccion neural',
        metadata:      { nombre: nombre || '' },
      }),
    });

    const charge = await response.json();

    if (charge.object === 'charge' && charge.outcome?.type === 'venta_exitosa') {
      return res.json({ success: true, chargeId: charge.id });
    }

    const msg = charge.user_message || charge.merchant_message || 'Pago rechazado por el banco';
    return res.status(400).json({ error: String(msg) });

  } catch (err) {
    console.error('culqi-charge error:', err);
    return res.status(500).json({ error: err.message || 'Error interno al procesar el pago' });
  }
}

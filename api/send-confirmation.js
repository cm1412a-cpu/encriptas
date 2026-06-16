export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    email, paymentIntentId, protectionType, protectedData,
    coverage, activationKey, activationDate, renewalDate,
  } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email requerido' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn('RESEND_API_KEY no configurada — email omitido');
    return res.json({ sent: false, reason: 'RESEND_API_KEY no configurada' });
  }

  const badge = (c) =>
    `<span style="display:inline-block;padding:3px 10px;margin:2px;background:rgba(0,255,136,0.09);border:1px solid rgba(0,255,136,0.22);border-radius:999px;color:#6ee7b7;font-size:11px;">${c}</span>`;

  const coverageBadges = Array.isArray(coverage) && coverage.length
    ? coverage.map(badge).join('')
    : '<span style="color:#475569;font-size:12px;">—</span>';

  const row = (label, value, mono = false) => `
    <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;">${label}</span><br>
      <span style="font-size:${mono ? '11px' : '13px'};color:${mono ? '#a78bfa' : '#e2e8f0'};font-family:${mono ? 'Courier New,monospace' : 'inherit'};font-weight:${mono ? '400' : '600'};">${value}</span>
    </td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#060412;font-family:'Segoe UI',Arial,sans-serif;color:#fff;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#060412;padding:40px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#0d0618;border:1px solid rgba(139,92,246,0.2);border-radius:20px;overflow:hidden;">

  <tr><td style="padding:32px;text-align:center;background:linear-gradient(135deg,#1a0d35,#0d0618);border-bottom:1px solid rgba(139,92,246,0.12);">
    <p style="margin:0;font-size:22px;font-weight:900;color:#fff;">Encriptas</p>
    <p style="margin:6px 0 0;font-size:10px;color:#64748b;letter-spacing:3px;text-transform:uppercase;">Sistema de Cifrado Neural</p>
  </td></tr>

  <tr><td style="padding:28px 36px 0;text-align:center;">
    <span style="display:inline-block;padding:10px 28px;background:rgba(0,255,136,0.09);border:1px solid rgba(0,255,136,0.28);border-radius:999px;color:#00ff88;font-size:12px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">
      ¡PAGO EXITOSO!
    </span>
  </td></tr>

  <tr><td style="padding:24px 36px 0;">
    <p style="margin:0 0 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:#a78bfa;">Comprobante de Pago</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(139,92,246,0.05);border:1px solid rgba(139,92,246,0.13);border-radius:12px;padding:16px 20px;">
      ${row('ID de Transaccion', paymentIntentId || '—', true)}
      ${row('Fecha de Activacion', activationDate || '—')}
      ${row('Proxima Renovacion', renewalDate || '—')}
    </table>
  </td></tr>

  <tr><td style="padding:20px 36px 0;">
    <p style="margin:0 0 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:#a78bfa;">Lo que se Protegió</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(139,92,246,0.05);border:1px solid rgba(139,92,246,0.13);border-radius:12px;padding:16px 20px;">
      ${row('Tipo de Proteccion', protectionType || '—')}
      ${row('Dato Protegido', protectedData || '—', true)}
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <span style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;">Cobertura Activada</span><br>
        <div style="margin-top:6px;">${coverageBadges}</div>
      </td></tr>
      ${row('Clave de Activacion', activationKey || '—', true)}
    </table>
  </td></tr>

  <tr><td style="padding:20px 36px 0;">
    <div style="background:rgba(124,58,237,0.06);border:1px solid rgba(139,92,246,0.13);border-radius:12px;padding:20px;">
      <p style="margin:0 0 8px;font-size:13px;color:#cbd5e1;line-height:1.7;">
        Tu protección está activa. Te avisaremos 3 días antes de la renovación.
      </p>
    </div>
  </td></tr>

  <tr><td style="padding:28px 36px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);margin-top:8px;">
    <p style="margin:0 0 5px;font-size:11px;color:#475569;">Pago procesado de forma segura por Culqi</p>
    <p style="margin:0 0 5px;font-size:11px;color:#475569;">soporte@encriptas.com · encriptas.com</p>
    <p style="margin:0;font-size:11px;color:#334155;font-weight:600;">© 2025 Encriptas — Seguridad Neural</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Encriptas <no-reply@encriptas.com>',
        to:      [email],
        subject: '¡Tu protección está activa! — Encriptas',
        html,
      }),
    });

    if (resp.ok) return res.json({ sent: true });

    const errData = await resp.json().catch(() => ({}));
    console.error('Resend error:', errData);
    return res.json({ sent: false, reason: String(errData.message || 'Error Resend') });

  } catch (err) {
    console.error('send-confirmation error:', err);
    return res.status(500).json({ error: err.message });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'contato@danilocc.com.br';
const TO_EMAIL = 'danilo.chagasclem@gmail.com';

function buildHtml(name: string, email: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0e17;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e17;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111827;border-radius:12px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#3b82f6,#6366f1);padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">
                ✉️ Nova mensagem do Portfólio
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                Alguém entrou em contato pelo seu site
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <!-- Name -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid #3b82f6;">
                    <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Nome</p>
                    <p style="margin:0;color:#f3f4f6;font-size:16px;font-weight:500;">${escapeHtml(name)}</p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid #6366f1;">
                    <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</p>
                    <a href="mailto:${escapeHtml(email)}" style="color:#60a5fa;font-size:16px;font-weight:500;text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 20px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid #8b5cf6;">
                    <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Mensagem</p>
                    <p style="margin:0;color:#e5e7eb;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;color:#6b7280;font-size:12px;">
                Enviado via <span style="color:#60a5fa;">danilocc.com.br</span> • Portfólio
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Portfólio Danilo <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Nova mensagem de ${name} — Portfólio`,
      html: buildHtml(name, email, message),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

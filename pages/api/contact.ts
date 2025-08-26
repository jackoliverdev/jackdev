import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

type ContactBody = {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const resendApiKey = process.env.RESEND_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  if (!resendApiKey) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY' })
  }

  const { name, email, phone, message } = (req.body || {}) as ContactBody

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const resend = new Resend(resendApiKey)

  try {
    const subject = `New website contact from ${name}`
    const textLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'N/A'}`,
      '',
      'Message:',
      message,
    ]

    await resend.emails.send({
      from: 'Jack Oliver Site <onboarding@resend.dev>',
      to: ['jackoliverdev@gmail.com'],
      replyTo: email,
      subject,
      text: textLines.join('\n'),
    })

    // Optional confirmation back to the sender (silent failure acceptable)
    try {
      await resend.emails.send({
        from: 'Jack Oliver <onboarding@resend.dev>',
        to: [email],
        subject: 'Thanks for getting in touch',
        text: `Hi ${name},\n\nThanks for your message — I’ll get back to you shortly.\n\n— Jack`,
      })
    } catch (_) {}

    return res.status(200).json({ ok: true })
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Failed to send email' })
  }
}



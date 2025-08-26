import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY

// This endpoint can be called from the client after Calendly confirms a booking
// or connected as a webhook target if you later enable Calendly webhooks.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  if (!resendApiKey) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY' })
  }

  const { inviteeName, inviteeEmail, eventName, eventStart, eventEnd, payload } = req.body || {}

  const resend = new Resend(resendApiKey)

  try {
    const lines = [
      `Event: ${eventName || 'Discovery Call'}`,
      `Start: ${eventStart || 'Unknown'}`,
      `End: ${eventEnd || 'Unknown'}`,
      `Invitee: ${inviteeName || 'Unknown'} (${inviteeEmail || 'no email'})`,
      '',
      'Raw Payload:',
      JSON.stringify(payload || req.body, null, 2),
    ]

    await resend.emails.send({
      from: 'Jack Oliver Site <onboarding@resend.dev>',
      to: ['jackoliverdev@gmail.com'],
      subject: 'New Calendly booking',
      text: lines.join('\n'),
    })

    // Optional confirmation to invitee
    if (inviteeEmail) {
      try {
        await resend.emails.send({
          from: 'Jack Oliver <onboarding@resend.dev>',
          to: [inviteeEmail],
          subject: 'Your booking is confirmed',
          text: `Hi ${inviteeName || ''},\n\nThanks for booking a call. I look forward to speaking with you.\n\n— Jack`,
        })
      } catch (_) {}
    }

    return res.status(200).json({ ok: true })
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Failed to send booking email' })
  }
}



import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  // This grabs the email and message from your contact_inquiries table
  const { record } = await req.json() 

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
    },
    body: JSON.stringify({
      from: 'Lumina <onboarding@resend.dev>',
      to: 'neelsabhaya90@gmail.com', // Your email where you want to get alerts
      subject: 'New Inquiry: Lumina.ai',
      html: `<strong>User Email:</strong> ${record.email}<br><strong>Message:</strong> ${record.message}`,
    }),
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } })
})
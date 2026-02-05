import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

// These headers allow your local browser to talk to Supabase
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle the browser's security check (OPTIONS request)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message } = await req.json()
    const client = new SmtpClient()

    // Using your Google App Password
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "neelsabhaya90@gmail.com",
      password: "wdalmzmvbbhxupfm", 
    })

    await client.send({
      from: "neelsabhaya90@gmail.com",
      to: "neelsabhaya90@gmail.com", 
      subject: `Lumina.ai Inquiry from ${name}`,
      content: `From: ${email}\n\nMessage: ${message}`,
    })

    await client.close()

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    })
  }
})
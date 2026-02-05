"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { Github, Linkedin, Shield, Zap, Globe } from "lucide-react"

export default function AboutPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  
  // State for form handling
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Submission Logic to trigger the Google SMTP Edge Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return alert("Please fill in all fields")

    setIsSubmitting(true)

    try {
      // Calls your specific Google SMTP Edge Function
      const { error } = await supabase.functions.invoke('contact-form', {
        body: { 
          name: "Lumina User", 
          email: email, 
          message: message 
        },
      })

      if (error) throw error

      alert("Inquiry submitted! Check your email at neelsabhaya90@gmail.com.")
      setEmail("")
      setMessage("")
      
    } catch (err: unknown) {
      // Improved error handling to satisfy TypeScript/ESLint
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      alert("Error sending message: " + errorMessage)
      console.error("Function Error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground no-scrollbar transition-colors duration-500">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className="container max-w-4xl mx-auto pt-40 pb-20 px-6 space-y-24">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6 animate-in fade-in duration-1000">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/40 leading-none ">
              Lumina<span className="text-emerald-500">.ai</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">
              Architectural Protocol v1.0
            </p>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground italic font-light max-w-2xl mx-auto leading-relaxed">
            &quot;Refining raw thoughts into precision engineered intent.&quot;
          </p>
        </section>

        {/* TECHNOLOGY STACK */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-10 rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-3xl space-y-6 group hover:border-emerald-500/30 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase tracking-widest leading-none">Groq Logic</h3>
              <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">Inference Engine</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Utilizing LPU™ technology to provide near-instant architectural feedback, helping you reach 100% confidence in seconds.
            </p>
          </div>

          <div className="p-10 rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-3xl space-y-6 group hover:border-emerald-500/30 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase tracking-widest leading-none">Supabase Core</h3>
              <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">Secure Infrastructure</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Isolated history through Row Level Security (RLS). Neel and Parth&apos;s data remain physically separated at the core.
            </p>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <section className="space-y-12 pb-20">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Connect</h2>
            <div className="h-1 w-12 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-10 rounded-[3rem] border border-border bg-linear-to-b from-card/60 to-transparent backdrop-blur-3xl space-y-8 shadow-2xl">
            <div className="space-y-4">
              <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Registry Email" 
                type="email"
                required
                className="h-16 rounded-full bg-background/40 border-border px-8 font-medium focus:border-emerald-500/50 transition-all" 
              />
              <Textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry..." 
                required
                className="min-h-40 rounded-[2rem] bg-background/40 border-border p-8 font-medium focus:border-emerald-500/50 transition-all" 
              />
            </div>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-95"
            >
              {isSubmitting ? "Processing..." : "Submit Inquiry"}
            </Button>
          </form>
        </section>

        {/* FOOTER */}
        <footer className="pt-16 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-black">L</div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em]">Lumina Architectural Systems © 2026</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"><Github className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"><Linkedin className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"><Globe className="w-4 h-4" /></Button>
          </div>
        </footer>
      </main>
    </div>
  )
}
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// FIX: Define a clear interface for the incoming history items
interface HistoryItem {
  role: string;
  parts: { text: string }[];
}

export async function POST(req: Request) {
  try {
    const { prompt, mode, history } = await req.json();

    // FIX: Replaced 'any' with the specific Groq message type
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are the Lumina Architect (${mode} mode). 
        1. Assign a Context Score (0-100) based on user detail.
        2. If score < 100, ask 2-3 specific questions in 'feedback'.
        3. If score is 100, provide the final prompt in 'architected_prompt'.
        Return ONLY JSON: {"score": number, "feedback": "string", "architected_prompt": "string|null"}`
      },
      // FIX: Explicitly typed the history mapping
      ...history.map((h: HistoryItem): Groq.Chat.ChatCompletionMessageParam => ({
        role: (h.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: h.parts[0].text
      })),
      { role: "user", content: prompt }
    ];

    const completion = await groq.chat.completions.create({
      messages: messages, // Now type-safe
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const result = completion.choices[0]?.message?.content;
    return NextResponse.json(JSON.parse(result || "{}"));
  } catch (error) {
    console.error("Groq Error:", error);
    return NextResponse.json({ error: "Architect failed to connect." }, { status: 500 });
  }
}
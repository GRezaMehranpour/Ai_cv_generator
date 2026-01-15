import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const groq = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: "https://api.groq.com/openai/v1" });

export async function POST(req: Request) {
  try {
    const { text, jobTitle, targetLanguage } = await req.json();
    const systemPrompt = `
      You are a Global Resume Expert. 
      TASK: Detect input language, translate to ${targetLanguage}, and rewrite into professional resume bullet points.
      RULES:
      - OUTPUT MUST BE ENTIRELY IN ${targetLanguage}.
      - Start every bullet point with a powerful Action Verb.
      - Return ONLY the bullet points starting with (•). NO intro text.
      - Industry Context: ${jobTitle}.
    `;
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: text }],
      temperature: 0.3,
    });
    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
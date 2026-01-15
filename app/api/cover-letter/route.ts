import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const groq = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: "https://api.groq.com/openai/v1" });

export async function POST(req: Request) {
  try {
    const { resumeData, jobDescription, fullName, targetLanguage } = await req.json();
    const systemPrompt = `
      Write a professional Cover Letter in ${targetLanguage}.
      RULES:
      - Match candidate skills to the Job Description.
      - Tone: Formal and Persuasive.
      - OUTPUT ONLY THE LETTER.
      - IMPORTANT: Sign the letter specifically as "Sincerely, ${fullName}". Do NOT use "The Candidate".
    `;
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: `Name: ${fullName}. Exp: ${resumeData}. Job: ${jobDescription}` }],
      temperature: 0.5,
    });
    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const runtime = "edge";
export async function POST(req: Request) {
  const body = await req.json();

  const completion = await openai.beta.chat.completions.parse({
    messages: [...body.messages],
    model: "gpt-4o-mini",
  });

  const response = completion.choices;

  return NextResponse.json({ output: response }, { status: 200 });
}

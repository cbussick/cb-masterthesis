import { CBAIChatResponseSchema } from "@/helpers/openai/schemas/CBAIChatResponse";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const runtime = "edge";
export async function POST(req: Request) {
  const body = await req.json();

  const completion = await openai.beta.chat.completions.parse({
    messages: [...body.messages],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(
      CBAIChatResponseSchema,
      "ai-chat-response",
    ),
  });

  const response = completion.choices;

  return NextResponse.json({ output: response }, { status: 200 });
}

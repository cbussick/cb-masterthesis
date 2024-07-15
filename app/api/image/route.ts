import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const runtime = "edge";
export async function POST(req: Request) {
  const body = await req.json();

  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: body.prompt,
    n: 1,
    size: "1024x1024",
  });

  return NextResponse.json({ output: image }, { status: 200 });
}

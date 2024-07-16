import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const runtime = "edge";
export async function POST(req: Request) {
  const body = await req.json();

  const speech = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: body.input,
    response_format: "mp3",
    speed: 1,
  });

  return new NextResponse(speech.body, {
    status: 200,
  });
}

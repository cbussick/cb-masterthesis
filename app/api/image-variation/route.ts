import { createReadStream } from "fs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();

  // Remove the `/` at the beginning of the image path to make this work.
  const filePath = path.resolve("./public", body.image.substring(1));

  const image = await openai.images.createVariation({
    model: "dall-e-2",
    image: createReadStream(filePath),
    n: 1,
    size: "256x256",
    response_format: "b64_json",
  });

  return NextResponse.json({ output: image }, { status: 200 });
}

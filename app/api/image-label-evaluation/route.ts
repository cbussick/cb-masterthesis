import { CBImageLabelEvaluationSchema } from "@/helpers/openai/schemas/CBImageLabelEvaluation";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const runtime = "edge";
export async function POST(req: Request) {
  const body = await req.json();

  const completion = await openai.beta.chat.completions.parse({
    messages: [
      // {
      //   role: "system",
      //   content: "Du bist ein hilfreicher Biologie-Lehrer.",
      // },
      {
        role: "user",
        content: body.messages[0].content,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(
      CBImageLabelEvaluationSchema,
      "image-label-evaluation",
    ),
  });

  const response = completion.choices;

  return NextResponse.json({ output: response }, { status: 200 });
}

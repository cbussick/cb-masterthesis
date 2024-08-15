import { CBFreeformQuestionEvaluationSchema } from "@/helpers/openai/schemas/CBFreeformQuestionEvaluation";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// TODO: Eigentlich passt diese Beispiel-Antwort doch gar nicht mehr, weil sie nicht im JSON Format ist? Und das "Ja;;" und "Nein;;" ist wegen Structured Outputs nicht mehr richtig oder?
//
// Show the AI assistant what the conversation should look like
const examples: ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: `Ist die Antwort "Im Zellkern" eine korrekte Antwort auf die Frage "In welcher Zellorganelle findet die Mitose statt?" Beginne deine Antwort mit "Ja;;" oder "Nein;;". Gib danach nur den Grund an.`,
  },
  {
    role: "assistant",
    content: "Ja;; Die Mitose findet im Zellkern statt.",
  },
];

export const runtime = "edge";
export async function POST(req: Request) {
  const body = await req.json();

  const completion = await openai.beta.chat.completions.parse({
    messages: [
      {
        role: "system",
        content: "Du bist ein hilfreicher Biologie-Lehrer.",
      },
      ...examples,
      {
        role: "user",
        content: body.messages[0].content,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(
      CBFreeformQuestionEvaluationSchema,
      "freeform-question-evaluation",
    ),
  });

  const response = completion.choices;

  return NextResponse.json({ output: response }, { status: 200 });
}

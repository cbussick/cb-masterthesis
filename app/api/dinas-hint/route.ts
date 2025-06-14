import { CBDiNAsHintSchema } from "@/helpers/openai/schemas/CBDiNAsHint";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// TODO: Eigentlich passt diese Beispiel-Antwort doch gar nicht mehr, weil sie nicht im JSON Format ist?
//
// Show the AI assistant what the conversation should look like
const examples: ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: `Gib mir einen Tipp für die Frage "In welcher Zellorganelle findet die Mitose statt?".`,
  },
  {
    role: "assistant",
    content:
      "Die Mitose ist ein entscheidender Schritt im Zellzyklus, der die Zellteilung ermöglicht. Überlege, in welchem Organell dieser Prozess stattfinden könnte, indem du dir überlegst, welche Strukturen und Umgebungen für eine präzise Zellteilung notwendig sind.",
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
    response_format: zodResponseFormat(CBDiNAsHintSchema, "dinas-hint"),
  });

  const response = completion.choices;

  return NextResponse.json({ output: response }, { status: 200 });
}

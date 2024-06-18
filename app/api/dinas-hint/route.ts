import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

  const completion = await openai.chat.completions.create({
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
    model: "gpt-3.5-turbo",
  });

  const response = completion.choices;

  return NextResponse.json({ output: response }, { status: 200 });
}

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
      {
        role: "system",
        content: `Sie sind ein erfahrener Lehrer für Schülerinnen und Schüler des Berufskollegs, die sich auf ihr Fachabitur oder ihr Abitur vorbereiten. Sie sind hilfsbereit, nett und ermutigend. Sie erhalten ein Bild, die Antwort eines Schülers auf die Frage, was dieses Bild darstellt und die Musterlösung. Ihre Aufgabe ist es, zu beurteilen, ob die Antwort unter Berücksichtigung der Musterlösung eine gute Antwort auf die Frage, was das Bild darstellt, ist. Der Schüler kennt die Musterlösung nicht.
          Schreiben Sie ihre Bewertung, ob die Antwort korrekt ist in das Feld "evaluation".
          Formulieren Sie zudem Feedback für den Schüler in maximal 2 Sätzen.
Falls die Antwort des Schülers falsch ist, geben Sie dem Schüler konstruktives Feedback, wie er seine Antwort verbessern kann und ermutigen Sie ihn weiterzumachen.
Falls die Antwort des Schülers richtig ist, geben Sie dem Schüler positives Feedback und ermutigen Sie ihn sich weiter zu verbessern.
Schreiben Sie dieses Feedback in das Feld "feedback".`,
      },
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

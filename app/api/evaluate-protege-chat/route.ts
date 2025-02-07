import { CBFreeformQuestionEvaluationSchema } from "@/helpers/openai/schemas/CBFreeformQuestionEvaluation";
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
        content: `Sie sind ein erfahrener Lehrer für Schülerinnen und Schüler des Berufskollegs, die sich auf ihr Fachabitur oder ihr Abitur vorbereiten. Sie sind hilfsbereit, nett und ermutigend. Sie erhalten eine Unterhaltung zwischen zwei Schülern, in der der eine Schüler (genannt "Schüler A", ihm gehören die Nachrichten in den Objekten mit "role: assistant") dem anderen Schüler (genannt "Schüler B", ihm gehören die Nachrichten in den Objekten mit "role: user") etwas erklären und hören möchte, ob seine Erklärungen korrekt sind. Ihre Aufgabe ist es, zu beurteilen, ob der Schüler B die Erklärungen korrekt ausgewertet hat. Hierbei handelt es sich um eine Übung für Schüler B, in der er die Chance bekommt sein Wissen zu festigen, indem er die Erklärungen von Schüler A bewertet und verbessert.

Sie kennen sich mit dem Thema sehr gut aus. Sie können inhaltliche Fehler erkennen.

Beurteilungsschritte:
1. Lesen Sie die gesamte Unterhaltung: Lesen Sie zunächst die gesamte Unterhaltung sorgfältig durch. Verstehen Sie den Kontext, die wichtigsten Punkte und alle relevanten Details.
2. Lesen Sie jede Interaktion: Lesen Sie jede Interaktion zwischen den beiden Schülern, das heißt jede Nachricht von Schüler A und die darauffolgende Antwort von Schüler B sorgfältig durch und beurteilen Sie sie aufgrund der folgenden Bewertungsfragen:
	1) Hat Schüler A einen Fehler gemacht und hat Schüler B den Fehler entdeckt und korrekt verbessert?
	2) Hat Schüler A einen Fehler gemacht und hat Schüler B den Fehler entdeckt und nicht korrekt verbessert?
	3) Hat Schüler A einen Fehler gemacht und hat Schüler B den Fehler nicht entdeckt?
	4) Hat Schüler A keinen Fehler gemacht und hat Schüler B ihn fälschlicherweise versucht zu verbessern?
	5) Hat Schüler A keinen Fehler gemacht und hat Schüler B dies richtigerweise als korrekt bewertet.
3. Punkte vergeben: Verwenden Sie die 5-Punkte-Skala, um der gesamten Unterhaltung eine Punktzahl zuzuweisen:
	• Punktzahl 1: Wenn die Unterhaltung das Ziel der Übung verfehlt hat. Der Schüler B hat keine Erklärungen angefordert, ist auf Erklärungen gar nicht eingegangen oder hat konsequent das Thema gewechselt.
	• Punktzahl 2: Wenn die Unterhaltung das Ziel der Übung zwar eingehalten hat, aber Schüler B die gemachten Fehler konsequent nicht entdeckt oder selber konsequent neue Fehler eingeführt hat.
	• Punktzahl 3: Wenn Schüler B gemachte Fehler entdeckt hat, aber seine Verbesserungen nicht immer korrekt waren.
	• Punktzahl 4: Wenn Schüler B gemachte Fehler entdeckt und sie größtenteils korrekt verbessert hat.
	• Punktzahl 5: Wenn Schüler B gemachte Fehler entdeckt und sie vollständig korrekt verbessert hat.
Nachdem Sie die Antwort bewertet haben, geben Sie die Punktzahl in das Feld "evaluation" ein.
Formulieren Sie zudem Feedback für den Schüler in maximal 2 Sätzen.
Falls die Bewertung eine 1 oder 2 ist, geben Sie Schüler B konstruktives Feedback, wie er seine Antworten an andere Schüler in Zukunft verbessern kann und ermutigen Sie ihn nicht aufzugeben.
Falls die Bewertung eine 3 ist, geben Sie Schüler B konstruktives Feedback, wie er seine Antworten an andere Schüler verbessern kann und ermutigen Sie ihn weiterzumachen.
Falls die Bewertung eine 4 oder 5 ist, geben Sie Schüler B positives Feedback und ermutigen Sie ihn sich weiter zu verbessern.
Schreiben Sie dieses Feedback in das Feld "feedback".`,
      },
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

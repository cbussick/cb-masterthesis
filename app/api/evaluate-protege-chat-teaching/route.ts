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
        content: `Sie sind ein erfahrener Lehrer für Schülerinnen und Schüler des Berufskollegs, die sich auf ihr Fachabitur oder ihr Abitur vorbereiten. Sie sind hilfsbereit, nett und ermutigend. Sie erhalten eine Unterhaltung zwischen zwei Schülern, in der der eine Schüler (genannt "Schüler A", ihm gehören die Nachrichten in den Objekten mit "role: user") dem anderen Schüler (genannt "Schüler B", ihm gehören die Nachrichten in den Objekten mit "role: assistant") ein Thema aus der Biologie erklären möchte. Ihre Aufgabe ist es, zu beurteilen, ob der Schüler A das Thema korrekt erklärt hat. Hierbei handelt es sich um eine Übung für Schüler A, in der er die Chance bekommt sein Wissen zu festigen, indem er Schüler B ein Thema erklärt.
Sie kennen sich mit dem Thema sehr gut aus. Sie können inhaltliche Fehler erkennen.
Beurteilungsschritte:
1. Lesen Sie die gesamte Unterhaltung: Lesen Sie zunächst die gesamte Unterhaltung sorgfältig durch. Verstehen Sie den Kontext, die wichtigsten Punkte und alle relevanten Details.
2. Lesen Sie jede Interaktion: Lesen Sie jede Interaktion zwischen den beiden Schülern, das heißt jede Nachricht von Schüler A und die darauffolgende Antwort von Schüler B sorgfältig durch und beurteilen Sie sie aufgrund der folgenden Bewertungsfragen:
	1) Hat Schüler A ein Thema aus der Biologie erklärt?
	2) Hat Schüler A in seiner Erklärung inhaltliche Fehler gemacht?
	3) Ist Schüler A auf eine Rückfrage von Schüler B eingegangen?
3. Punkte vergeben: Verwenden Sie die 5-Punkte-Skala, um der gesamten Unterhaltung eine Punktzahl zuzuweisen:
	• Punktzahl 1: Wenn die Unterhaltung das Ziel der Übung verfehlt hat. Der Schüler A hat keine Themen erklärt, ist auf Rückfragen gar nicht eingegangen oder hat konsequent das Thema gewechselt.
	• Punktzahl 2: Wenn die Unterhaltung das Ziel der Übung zwar eingehalten hat, aber die Erklärungen von Schüler A ausschließlich fehlerhaft waren.
	• Punktzahl 3: Wenn Schüler A in seinen Erklärungen zwar Fehler hatte, aber die Erklärungen trotzdem verständlich waren.
	• Punktzahl 4: Wenn Schüler A in seinen Erklärungen nur geringfügige Fehler hatte.
	• Punktzahl 5: Wenn Schüler A das Thema fehlerfrei erklärt hat.
Nachdem Sie die Antwort bewertet haben, geben Sie die Punktzahl in das Feld "evaluation" ein.
Formulieren Sie zudem Feedback für den Schüler in maximal 2 Sätzen. Sprechen Sie dabei den Schüler direkt an. Bezeichnen Sie Schüler B als "DiNA", falls Sie über diesen Schüler reden.
Falls die Bewertung eine 1 oder 2 ist, geben Sie Schüler A konstruktives Feedback, wie er seine Erklärungen an andere Schüler in Zukunft verbessern kann und ermutigen Sie ihn nicht aufzugeben.
Falls die Bewertung eine 3 ist, geben Sie Schüler A konstruktives Feedback, wie er seine Erklärungen an andere Schüler verbessern kann und ermutigen Sie ihn weiterzumachen.
Falls die Bewertung eine 4 oder 5 ist, geben Sie Schüler A positives Feedback und ermutigen Sie ihn sich weiter zu verbessern.
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

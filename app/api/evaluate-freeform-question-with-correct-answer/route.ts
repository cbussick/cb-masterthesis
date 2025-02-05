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
        content: `Sie sind ein erfahrener Lehrer für Schülerinnen und Schüler des Berufskollegs, die sich auf ihr Fachabitur oder ihr Abitur vorbereiten. Sie sind hilfsbereit, nett und ermutigend. Sie erhalten eine Frage, die Antwort eines Schülers auf diese Frage und die Musterlösung. Ihre Aufgabe ist es, zu beurteilen, ob die Antwort unter Berücksichtigung der Musterlösung eine gute Antwort auf die gestellte Frage ist. Der Schüler kennt die Musterlösung nicht.
Beurteilungsschritte:
1. Lesen Sie die Musterlösung: Lesen Sie zunächst die bereitgestellte Musterlösung sorgfältig durch. Verstehen Sie den Kontext, die wichtigsten Punkte und alle relevanten Details.
2. Analysieren Sie die Frage: Untersuchen Sie die Frage. Stellen Sie sicher, dass Sie genau verstehen, was die Frage verlangt.
3. Überprüfen Sie die Antwort: Lesen Sie die bereitgestellte Antwort sorgfältig durch und beurteilen Sie sie anhand der folgenden Kriterien:
	• Vollständigkeit: Geht die Antwort auf alle Aspekte der Frage ein oder fehlen wichtige Informationen?
	• Relevanz: Ist der Inhalt der Antwort für die Frage relevant oder enthält er irrelevante oder themenfremde Informationen?
	• Klarheit: Ist die Antwort klar und verständlich geschrieben?
	• Kohärenz: Ist die Antwort logisch strukturiert und organisiert, sodass sie leicht zu verfolgen ist?
	• Prägnanz: Ist die Antwort prägnant und auf den Punkt gebracht oder enthält sie unnötige Füllinhalte?
	• Richtigkeit: Bietet die Antwort genaue Informationen unter Berücksichtigung der Musterlösung?
	• Tiefe: Geht die Antwort über oberflächliche Details hinaus und bietet sie eine umfassende Antwort auf die Frage?
	• Ton: Ist der Ton der Antwort für einen pädagogischen Kontext geeignet und werden persönliche Meinungen und Vorurteile vermieden?
	• Engagement: Ist die Antwort für die Zielgruppe (Schülerinnen und Schüler des Berufskollegs, die sich auf ihr Fachabitur oder ihr Abitur vorbereiten) ansprechend und interessant?
4. Punkte vergeben: Verwenden Sie die 5-Punkte-Skala, um der Antwort eine Punktzahl zuzuweisen:
	• Punktzahl 1: Wenn die Antwort unvollständig, vage, themenfremd oder umstritten ist. Wenn sie fehlende Inhalte, Werbetexte, Navigationstexte oder irrelevante Informationen enthält.
	• Punktzahl 2: Wenn die Antwort die Frage nur minimal behandelt und nur allgemeine Details liefert.
	• Punktzahl 3: Wenn die Antwort hilfreich ist, aber viele Details fehlen, persönliche Erfahrungen oder Meinungen enthält oder externe Informationen erwähnt.
	• Punktzahl 4: Wenn die Antwort gut geschrieben, klar und auf die Frage fokussiert ist. Sie bietet eine vollständige und umfassende Antwort mit geringem Verbesserungspotenzial.
	• Punktzahl 5: Wenn die Antwort eine perfekte Antwort auf die Frage ist. Sie ist bewusst geschrieben, frei von irrelevanten Inhalten, von hoher Qualität und zeugt von Expertenwissen.
Nachdem Sie die Antwort bewertet haben, geben Sie die Punktzahl in das Feld "evaluation" ein.
Formulieren Sie zudem Feedback für den Schüler in maximal 2 Sätzen.
Falls die Bewertung eine 1 oder 2 ist, geben Sie dem Schüler konstruktives Feedback, wie er seine Antwort verbessern kann und ermutigen Sie ihn nicht aufzugeben.
Falls die Bewertung eine 3 ist, geben Sie dem Schüler konstruktives Feedback, wie er seine Antwort verbessern kann und ermutigen Sie ihn weiterzumachen.
Falls die Bewertung eine 4 oder 5 ist, geben Sie dem Schüler positives Feedback und ermutigen Sie ihn sich weiter zu verbessern.
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
      "freeform-question-evaluation-with-correct-answer",
    ),
  });

  const response = completion.choices;

  return NextResponse.json({ output: response }, { status: 200 });
}

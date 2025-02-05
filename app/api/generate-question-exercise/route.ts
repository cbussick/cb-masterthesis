import { CBGenerateAIQuestionExerciseSchema } from "@/helpers/openai/schemas/CBGenerateAIQuestionExerciseSchema";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const examples: ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: `Die Definitionen: "Ein-Chromatid-Chromosomen sind Chromosomen, die aus einem einzigen Chromatid bestehen. Ein Chromatid ist ein einzelner DNA-Strang, der während der Zellteilung repliziert wird und beide durch ein Centromer verbunden werden.",
"Die Telophase II ist die letzte Phase der zweiten meiotischen Teilung, in der sich an den Zellpolen neue Kernhüllen um die Chromosomen bilden, die Chromosomen dekondensieren und die Zelle sich durch Zytokinese in vier haploide Tochterzellen teilt.",
"Nach der Mendelschen Regel der Dominanz hat ein Allel in einer Allelpaarung (Genotyp) die Fähigkeit, sich gegenüber einem anderen Allel durchzusetzen und das Erscheinungsbild (Phänotyp) zu bestimmen. Das dominante Allel wird mit einem Großbuchstaben gekennzeichnet, während das rezessive Allel mit einem Kleinbuchstaben gekennzeichnet wird.",
"Eine monohybride Kreuzung bezieht sich auf die Kreuzung von Individuen, die sich nur in einem einzigen Merkmal (genetisches Merkmal) unterscheiden. Mendel untersuchte in seinen Experimenten monohybride Kreuzungen.",
"Trisomie ist eine genetische Abnormalität, bei der ein zusätzliches Chromosom zu den normalen zwei Exemplaren in einer Zelle vorliegt. Ein bekanntes Beispiel ist das Down-Syndrom (Trisomie 21), bei dem es ein zusätzliches Chromosom 21 gibt.".`,
  },
  {
    role: "assistant",
    content: `{"questions": [{"question": "Was sind Ein-Chromatid-Chromosomen und wie sind sie aufgebaut?", "definition": "Ein-Chromatid-Chromosomen sind Chromosomen, die aus einem einzigen Chromatid bestehen. Ein Chromatid ist ein einzelner DNA-Strang, der während der Zellteilung repliziert wird und beide durch ein Centromer verbunden werden."},
    {"question": "Was geschieht in der Telophase II der meiotischen Teilung?", "definition": "Die Telophase II ist die letzte Phase der zweiten meiotischen Teilung, in der sich an den Zellpolen neue Kernhüllen um die Chromosomen bilden, die Chromosomen dekondensieren und die Zelle sich durch Zytokinese in vier haploide Tochterzellen teilt."},
    {"question": "Was versteht man unter der Mendelschen Regel der Dominanz?", "definition": "Nach der Mendelschen Regel der Dominanz hat ein Allel in einer Allelpaarung (Genotyp) die Fähigkeit, sich gegenüber einem anderen Allel durchzusetzen und das Erscheinungsbild (Phänotyp) zu bestimmen. Das dominante Allel wird mit einem Großbuchstaben gekennzeichnet, während das rezessive Allel mit einem Kleinbuchstaben gekennzeichnet wird."},
    {"question": "Was versteht man unter einer monohybriden Kreuzung in der Genetik?", "definition": "Eine monohybride Kreuzung bezieht sich auf die Kreuzung von Individuen, die sich nur in einem einzigen Merkmal (genetisches Merkmal) unterscheiden. Mendel untersuchte in seinen Experimenten monohybride Kreuzungen."},
    {"question": "Was ist Trisomie und welches bekannte Beispiel gibt es dafür?", "definition": "Trisomie ist eine genetische Abnormalität, bei der ein zusätzliches Chromosom zu den normalen zwei Exemplaren in einer Zelle vorliegt. Ein bekanntes Beispiel ist das Down-Syndrom (Trisomie 21), bei dem es ein zusätzliches Chromosom 21 gibt."}]}`,
  },
  {
    role: "user",
    content: `Die Definitionen: "Eine Translokation ist eine chromosomale Anomalie, bei der Teile von zwei nicht homologen Chromosomen ausgetauscht werden. Es kann zu genetischen Störungen führen, wenn wichtige genetische Informationen in die falschen Chromosomenregionen gelangen.",
"Autosomen sind Chromosomen, die nicht geschlechtsbestimmend sind. Ein Mensch hat 22 Autosomen-Paare.",
"Rezessive Allele werden von dominanten Allelen überdeckt und zeigen ihren Phänotyp nur, wenn sie in doppelter Ausführung vorliegen. Rezessive Allele werden mit einem Kleinbuchstaben gekennzeichnet.".`,
  },
  {
    role: "assistant",
    content: `{"question": [{"question": "Was versteht man unter einer Translokation im Zusammenhang mit chromosomalen Anomalien?", "definition": "Eine Translokation ist eine chromosomale Anomalie, bei der Teile von zwei nicht homologen Chromosomen ausgetauscht werden. Es kann zu genetischen Störungen führen, wenn wichtige genetische Informationen in die falschen Chromosomenregionen gelangen."},
    {"question": "Was sind Autosomen und wie viele Autosomen-Paare hat ein Mensch?", "definition": "Autosomen sind Chromosomen, die nicht geschlechtsbestimmend sind. Ein Mensch hat 22 Autosomen-Paare."}],
    {"question": "Was sind rezessive Allele und wie werden sie gekennzeichnet?", "definition": "Rezessive Allele werden von dominanten Allelen überdeckt und zeigen ihren Phänotyp nur, wenn sie in doppelter Ausführung vorliegen. Rezessive Allele werden mit einem Kleinbuchstaben gekennzeichnet."}]}`,
  },
];

export const runtime = "edge";
export async function POST(req: Request) {
  const body = await req.json();

  const completion = await openai.beta.chat.completions.parse({
    messages: [
      {
        role: "system",
        content: `Erstelle für jede der folgenden Definitionen eine Frage. Schreibe die Frage in das Feld "question". Schreibe die Definition, die du hier übergeben bekommst in das Feld "definition".`,
      },
      ...examples,
      {
        role: "user",
        content: body.messages[0].content,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(
      CBGenerateAIQuestionExerciseSchema,
      "generate-quiz-exercise",
    ),
  });

  const response = completion.choices;

  return NextResponse.json({ output: response }, { status: 200 });
}

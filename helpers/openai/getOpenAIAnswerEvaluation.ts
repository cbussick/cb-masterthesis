import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBFreeformQuestionEvaluation } from "./schemas/CBFreeformQuestionEvaluation";

export const getOpenAIAnswerEvaluation = async (
  question: string,
  answer: string,
): Promise<CBFreeformQuestionEvaluation> => {
  // TODO: Das "Ja" und "Nein" ist wegen Structured Outputs nicht mehr richtig oder?
  const prompt = `Ist die Antwort "${answer}" eine korrekte Antwort auf die Frage "${question}"? Beginne deine Antwort mit "Ja;;" oder "Nein;;". Gib danach nur den Grund an.`;

  const evaluation = await makeOpenAITextGenerationAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.EvaluateFreeformQuestion],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung deiner Antwort etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return evaluation;
};

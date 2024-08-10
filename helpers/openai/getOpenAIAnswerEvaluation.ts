import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { CBFreeformQuestionEvaluation } from "./CBFreeformQuestionEvaluation";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";

export const getOpenAIAnswerEvaluation = async (
  question: string,
  answer: string,
): Promise<CBFreeformQuestionEvaluation> => {
  const prompt = `Ist die Antwort "${answer}" eine korrekte Antwort auf die Frage "${question}"? Beginne deine Antwort mit "Ja;;" oder "Nein;;". Gib danach nur den Grund an.`;

  const evaluation = await makeOpenAITextGenerationAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.FreeformQuestion],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung deiner Antwort etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return evaluation;
};

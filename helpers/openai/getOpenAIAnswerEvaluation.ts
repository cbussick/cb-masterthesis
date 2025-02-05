import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBFreeformQuestionEvaluation } from "./schemas/CBFreeformQuestionEvaluation";

export const getOpenAIAnswerEvaluation = async (
  question: string,
  answer: string,
  definition: string,
): Promise<CBFreeformQuestionEvaluation> => {
  const prompt = `Bewerten Sie die folgende Antwort auf die Frage unter Berücksichtigung der Begriffsdefinition.
Die Begriffsdefinition: "${definition}"
Die Frage für diese Begriffsdefinition: "${question}"
Die Antwort: "${answer}"`;

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

import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBFreeformQuestionEvaluation } from "./schemas/CBFreeformQuestionEvaluation";

export const getOpenAIAnswerEvaluationWithCorrectAnswer = async (
  question: string,
  answer: string,
  correctAnswer: string,
): Promise<CBFreeformQuestionEvaluation> => {
  const prompt = `Bewerten Sie die folgende gegebene Antwort auf die Frage unter Berücksichtigung der Musterlösung.
  Die Frage für diese Begriffsdefinition: "${question}"
  Die gegebene Antwort: "${answer}"
  Die Musterlösung: "${correctAnswer}"`;

  const evaluation = await makeOpenAITextGenerationAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.EvaluateFreeformQuestionWithCorrectAnswer],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung deiner Antwort etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return evaluation;
};

import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBFreeformQuestionEvaluation } from "./schemas/CBFreeformQuestionEvaluation";

export const getOpenAIAnswerEvaluation = async (
  question: string,
  answer: string,
): Promise<CBFreeformQuestionEvaluation> => {
  const prompt = `Ist die Antwort "${answer}" eine richtige Antwort auf die Frage "${question}"?. Schreibe deine Bewertung in das Feld "evaluation", indem du "false" für "falsch" schreibst und "true" für "richtig". Schreibe eine kurze Begründung ist das Feld "reason".`;

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

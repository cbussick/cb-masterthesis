import { CBChatMessage } from "@/data/exercises/CBChatMessage";
import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBFreeformQuestionEvaluation } from "./schemas/CBFreeformQuestionEvaluation";

export const getOpenAIProtegeChatEvaluation = async (
  isTeachingAI: boolean,
  messages: CBChatMessage[],
): Promise<CBFreeformQuestionEvaluation> => {
  const prompt = `Bewerten Sie die folgende Unterhaltung.
Die Unterhaltung: "${JSON.stringify(messages, null, 2)}".`;

  const evaluation = await makeOpenAITextGenerationAPIRequest(
    prompt,
    apiRouteMap[
      isTeachingAI
        ? CBAPIRoute.EvaluateProtegeChatTeaching
        : CBAPIRoute.EvaluateProtegeChat
    ],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung der Unterhaltung etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return evaluation;
};

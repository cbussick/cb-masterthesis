import { CBChatMessage } from "@/data/exercises/CBChatMessage";
import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";

export const getOpenAIChatResponse = async (
  chatMessages: CBChatMessage[],
): Promise<string> => {
  const chatResponse = await makeOpenAITextGenerationAPIRequest(
    // Leave prompt empty, because it is ignored here anyway.
    // `chatMessages` contains all necessary information.
    "",
    apiRouteMap[CBAPIRoute.ProtegeChat],
    chatMessages,
  ).catch(() => {
    throw new Error(
      "Leider ist beim Chat etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return chatResponse;
};

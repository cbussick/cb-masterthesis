import { CBChatMessage } from "@/data/exercises/CBChatMessage";
import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBAIChatResponse } from "./schemas/CBAIChatResponse";

export const getOpenAIChatResponse = async (
  chatMessages: CBChatMessage[],
): Promise<CBAIChatResponse> => {
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

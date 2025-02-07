import { CBChatMessage } from "@/data/exercises/CBChatMessage";
import { useQuery } from "@tanstack/react-query";
import { CBAPIRoute } from "../apiRoutes";
import { getOpenAIChatResponse } from "../openai/getOpenAIChatResponse";

export const useGenerateInitialProtegeChatResponse = (
  chatMessage: CBChatMessage,
) => {
  const queryGenerateInitialProtegeChatResponse = useQuery({
    queryKey: [CBAPIRoute.ProtegeChat],
    queryFn: () => getOpenAIChatResponse([chatMessage]),
    // Allows clearing the cache on unmount (e.g. when the user switches the page)
    gcTime: 0,
  });

  return queryGenerateInitialProtegeChatResponse;
};

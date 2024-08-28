import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAIImageAPIRequest } from "./makeOpenAIImageAPIRequest";

export const getOpenAIImage = async (prompt: string) => {
  const image = await makeOpenAIImageAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.Image],
  ).catch(() => {
    throw new Error(
      "Leider ist beim Erstellen des Bilds etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return image;
};

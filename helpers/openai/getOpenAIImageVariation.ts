import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAIImageVariationAPIRequest } from "./makeOpenAIImageVariationAPIRequest";

export const getOpenAIImageVariation = async (image: string) => {
  const imageVariation = await makeOpenAIImageVariationAPIRequest(
    image,
    apiRouteMap[CBAPIRoute.ImageVariation],
  ).catch(() => {
    throw new Error(
      "Leider ist beim Erstellen des Bilds etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return imageVariation;
};

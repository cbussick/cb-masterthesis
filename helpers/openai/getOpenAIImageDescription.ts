import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";

export const getOpenAIImageDescription = async (
  imageSrc: string,
): Promise<any> => {
  const description = await makeOpenAITextGenerationAPIRequest(
    [
      {
        type: "text",
        text: "Was siehst du auf diesem Bild? Das Bild zeigt Abbildung eines Objekts aus der Biologie. Es handelt sich um ein Objekt, das Schülerinnen und Schüler des Berufskollegs, die sich auf ihr Fachabitur oder ihr Abitur vorbereiten im Unterricht behandeln.",
      },
      {
        type: "image_url",
        image_url: { url: imageSrc },
      },
    ],
    apiRouteMap[CBAPIRoute.ImageDescription],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung deiner Antwort etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return description;
};

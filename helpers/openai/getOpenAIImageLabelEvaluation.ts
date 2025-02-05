import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBImageLabelEvaluation } from "./schemas/CBImageLabelEvaluation";

export const getOpenAIImageLabelEvaluation = async (
  imageSrc: string,
  answer: string,
  term: string,
): Promise<CBImageLabelEvaluation> => {
  const prompt = `Antwort des Schülers: "${answer}".
  Musterlösung: "${term}".`;

  const evaluation = await makeOpenAITextGenerationAPIRequest(
    [
      {
        type: "text",
        text: prompt,
      },
      {
        type: "image_url",
        image_url: { url: imageSrc },
      },
    ],
    apiRouteMap[CBAPIRoute.ImageLabelEvaluation],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung deiner Antwort etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return evaluation;
};

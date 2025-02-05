import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBFreeformQuestionEvaluation } from "./schemas/CBFreeformQuestionEvaluation";

export const getOpenAIImageLabelEvaluation = async (
  imageSrc: string,
  answer: string,
): Promise<CBFreeformQuestionEvaluation> => {
  // TODO: Überarbeiten
  //
  // Das "Sei nicht zu strikt bei der Auswertung." ist wichtig, da sonst Antworten sehr schnell als falsch bewertet werden,
  // falls noch andere Elemente auf dem Bild zu sehen sind.
  const prompt = `Ist "${answer}" eine korrekte Beschriftung dieses Bildes? Sei nicht zu strikt bei der Auswertung. Begründe deine Antwort.`;

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

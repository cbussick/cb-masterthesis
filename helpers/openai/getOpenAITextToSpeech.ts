import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAITextToSpeechAPIRequest } from "./makeOpenAITextToSpeechAPIRequest";

export const getOpenAITextToSpeech = async (text: string) => {
  const speech = await makeOpenAITextToSpeechAPIRequest(
    text,
    apiRouteMap[CBAPIRoute.TextToSpeech],
  ).catch(() => {
    throw new Error(
      "Leider ist beim Erstellen der Stimme etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return speech;
};

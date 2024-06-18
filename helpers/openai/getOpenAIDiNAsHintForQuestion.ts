import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { makeOpenAIAPIRequest } from "./makeOpenAIAPIRequest";

export const getOpenAIDiNAsHintForQuestion = async (question: string) => {
  const prompt = `Gib mir einen Tipp für die Frage "${question}".`;

  const hint = await makeOpenAIAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.FreeformQuestion],
  ).catch(() => {
    throw new Error(
      "Leider ist beim Erfragen eines Tipps etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return hint;
};

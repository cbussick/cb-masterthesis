import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { CBDiNAsHint } from "./CBDiNAsHint";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";

export const getOpenAIDiNAsHintForQuestion = async (
  question: string,
): Promise<CBDiNAsHint> => {
  const prompt = `Gib mir einen Tipp für die Frage "${question}".`;

  const hint = await makeOpenAITextGenerationAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.DiNAsHint],
  ).catch(() => {
    throw new Error(
      "Leider ist beim Erfragen eines Tipps etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  return hint;
};

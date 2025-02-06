import { CBChatMessage } from "@/data/exercises/CBChatMessage";

export const makeOpenAITextGenerationAPIRequest = async (
  prompt: string | any[],
  apiRoute: string,
  messages?: CBChatMessage[],
) => {
  const response = await fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      messages: messages || [{ role: "user", content: prompt }],
    }),
  });

  if (response.ok) {
    const data = await response.json();

    if (data.output[0].message.parsed) {
      return data.output[0].message.parsed;
    }
    return data.output[0].message.content;
  }

  throw new Error(
    "Leider ist etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
  );
};

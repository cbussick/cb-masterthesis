export const makeOpenAITextToSpeechAPIRequest = async (
  text: string,
  apiRoute: string,
): Promise<string> => {
  const response = await fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ input: text }),
  });

  if (response.ok) {
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);

    return url;
  }

  throw new Error(
    "Leider ist etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
  );
};

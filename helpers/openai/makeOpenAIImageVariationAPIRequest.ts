export const makeOpenAIImageVariationAPIRequest = async (
  image: string,
  apiRoute: string,
): Promise<string> => {
  const response = await fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ image }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.output.data[0].b64_json;
  }

  throw new Error(
    "Leider ist etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
  );
};

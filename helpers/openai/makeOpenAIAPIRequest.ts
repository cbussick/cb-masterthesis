export const makeOpenAIAPIRequest = async (
  prompt: string,
  apiRoute: string,
) => {
  const response = await fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.output[0].message.content;
  }

  throw new Error(
    "Leider ist etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
  );
};

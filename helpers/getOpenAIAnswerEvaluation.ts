export async function getOpenAIAnswerEvaluation(
  question: string,
  answer: string,
) {
  const prompt = `Ist die Antwort "${answer}" eine korrekte Antwort auf die Frage "${question}"? Beginne deine Antwort mit "Ja;;" oder "Nein;;". Gib danach nur den Grund an.`;

  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
  });

  const data = await response.json();

  return data.output[0].message.content;
}

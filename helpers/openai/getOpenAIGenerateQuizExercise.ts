import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBQuizExercise } from "@/data/exercises/CBQuizExercise";
import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { dayjsLocalized } from "../time-tracking/dayjsLocalized";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";

export const getOpenAIQuizExercise = async (
  userId: string,
  topic: string,
): Promise<CBQuizExercise> => {
  const prompt = `Gib mir eine Quiz-Aufgabe für das Thema "${topic}". Schreib die Frage in das Feld "question" und vier Antwortmöglichkeiten in das Feld "answers".`;

  const evaluation = await makeOpenAITextGenerationAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.GenerateQuizExercise],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung deiner Antwort etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  });

  const evaluationWithStaticData: CBQuizExercise = {
    id: `${userId}_${dayjsLocalized().unix()}`,
    topic,
    type: CBExerciseType.AIQuiz,
    ...evaluation,
  };

  return evaluationWithStaticData;
};

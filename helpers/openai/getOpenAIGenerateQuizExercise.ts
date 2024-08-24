import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBQuizExercise } from "@/data/exercises/CBQuizExercise";
import { CBTopic } from "@/data/topics";
import { z } from "zod";
import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { dayjsLocalized } from "../time-tracking/dayjsLocalized";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBGenerateAIQuizExerciseSchema } from "./schemas/CBGenerateAIQuizExerciseSchema";

export const getOpenAIQuizExercise = async (
  userId: string,
  topic: CBTopic,
  amount: number,
): Promise<CBQuizExercise[]> => {
  const prompt = `Gib mir ${amount} Quiz-Aufgabe${amount > 1 ? "n" : ""} für das Thema "${topic}". Schreib die Frage in das Feld "question" und vier Antwortmöglichkeiten in das Feld "answers".`;

  const generatedQuizzes = (await makeOpenAITextGenerationAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.GenerateQuizExercise],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung deiner Antwort etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  })) as z.infer<typeof CBGenerateAIQuizExerciseSchema>;

  const quizzesWithStaticData: CBQuizExercise[] =
    generatedQuizzes.questions.map((quiz) => ({
      id: `${userId}_${dayjsLocalized().unix()}`,
      topic,
      type: CBExerciseType.AIQuiz,
      ...quiz,
    }));

  return quizzesWithStaticData;
};

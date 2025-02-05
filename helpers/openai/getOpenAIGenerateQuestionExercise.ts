import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBFreeformQuestionExerciseAIGenerated } from "@/data/exercises/CBFreeformQuestionExercise";
import { CBTopic } from "@/data/topics";
import { z } from "zod";
import { apiRouteMap, CBAPIRoute } from "../apiRoutes";
import { dayjsLocalized } from "../time-tracking/dayjsLocalized";
import { makeOpenAITextGenerationAPIRequest } from "./makeOpenAITextGenerationAPIRequest";
import { CBGenerateAIQuestionExerciseSchema } from "./schemas/CBGenerateAIQuestionExerciseSchema";

export const getOpenAIQuestionExercise = async (
  userId: string,
  topic: CBTopic,
  definitions: string[],
): Promise<CBFreeformQuestionExerciseAIGenerated[]> => {
  const prompt = `Die Definitionen: "${definitions.join(`",\n"`)}".`;

  const generatedQuestions = (await makeOpenAITextGenerationAPIRequest(
    prompt,
    apiRouteMap[CBAPIRoute.GenerateQuestionExercise],
  ).catch(() => {
    throw new Error(
      "Leider ist bei der Auswertung deiner Antwort etwas schief gegangen. Lade die Seite neu und versuche es erneut.",
    );
  })) as z.infer<typeof CBGenerateAIQuestionExerciseSchema>;

  const freeformQuestionExerciseWithStaticData: CBFreeformQuestionExerciseAIGenerated[] =
    generatedQuestions.questions.map((question, index) => ({
      id: `${userId}_${dayjsLocalized().unix()}_${index}`,
      topic,
      type: CBExerciseType.AIGeneratedQuestion,
      ...question,
    }));

  return freeformQuestionExerciseWithStaticData;
};

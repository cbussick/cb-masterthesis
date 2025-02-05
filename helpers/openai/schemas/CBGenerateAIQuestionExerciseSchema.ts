import { CBAIQuestionExercise } from "@/data/exercises/CBAIQuestionExercise";
import { z, ZodType } from "zod";

const CBAIQuestionExerciseSchema = z.object({
  question: z.string(),
  definition: z.string(),
}) satisfies ZodType<CBAIQuestionExercise>;

export const CBGenerateAIQuestionExerciseSchema = z.object({
  questions: z.array(CBAIQuestionExerciseSchema),
});

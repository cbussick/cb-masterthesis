import { CBAIQuizExercise } from "@/data/exercises/CBAIQuizExercise";
import { z, ZodType } from "zod";

const CBAIQuizExerciseSchema = z.object({
  question: z.string(),
  answers: z
    .object({
      id: z.string(),
      text: z.string(),
    })
    .array(),
  correctAnswer: z.string(),
}) satisfies ZodType<CBAIQuizExercise>;

export const CBGenerateAIQuizExerciseSchema = z.object({
  questions: z.array(CBAIQuizExerciseSchema),
});

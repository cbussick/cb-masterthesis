import { CBQuizExercise } from "@/data/exercises/CBQuizExercise";
import { z, ZodType } from "zod";

export const CBQuizExerciseSchema = z.object({
  question: z.string(),
  answers: z
    .object({
      id: z.string(),
      text: z.string(),
    })
    .array(),
  correctAnswer: z.string(),
  hint: z.string(),
}) satisfies ZodType<Omit<CBQuizExercise, "id" | "topic" | "type">>;

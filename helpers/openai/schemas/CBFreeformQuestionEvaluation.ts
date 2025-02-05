import { z } from "zod";

export const CBFreeformQuestionEvaluationSchema = z.object({
  evaluation: z.number(),
  feedback: z.string(),
});

export type CBFreeformQuestionEvaluation = z.infer<
  typeof CBFreeformQuestionEvaluationSchema
>;

import { z } from "zod";

export const CBFreeformQuestionEvaluationSchema = z.object({
  evaluation: z.boolean(),
  reason: z.string(),
});

export type CBFreeformQuestionEvaluation = z.infer<
  typeof CBFreeformQuestionEvaluationSchema
>;

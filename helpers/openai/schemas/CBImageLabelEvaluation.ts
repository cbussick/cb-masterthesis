import { z } from "zod";

export const CBImageLabelEvaluationSchema = z.object({
  evaluation: z.boolean(),
  reason: z.string(),
});

export type CBImageLabelEvaluation = z.infer<
  typeof CBImageLabelEvaluationSchema
>;

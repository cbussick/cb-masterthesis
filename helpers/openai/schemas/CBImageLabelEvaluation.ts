import { z } from "zod";

export const CBImageLabelEvaluationSchema = z.object({
  evaluation: z.boolean(),
  feedback: z.string(),
});

export type CBImageLabelEvaluation = z.infer<
  typeof CBImageLabelEvaluationSchema
>;

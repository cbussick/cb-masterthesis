import { z } from "zod";

export const CBImageLabelEvaluationSchema = z.object({
  evaluation: z.number(),
  feedback: z.string(),
});

export type CBImageLabelEvaluation = z.infer<
  typeof CBImageLabelEvaluationSchema
>;

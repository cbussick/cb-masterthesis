import { z } from "zod";

export const CBDiNAsHintSchema = z.object({
  hint: z.string(),
});

export type CBDiNAsHint = z.infer<typeof CBDiNAsHintSchema>;

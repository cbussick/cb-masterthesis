import { z } from "zod";

export const CBAIChatResponseSchema = z.object({
  message: z.string(),
  isConversationFinished: z.boolean(),
});

export type CBAIChatResponse = z.infer<typeof CBAIChatResponseSchema>;

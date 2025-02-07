/**
 * The values of these enums should mirror the roles from OpenAI.
 */
export enum CBChatMessageRole {
  // This is reserved for the initial prompt.
  System = "system",
  // "assistant" is the OpenAI message role for the model, so this should be named "assistant" instead of "AI".
  AI = "assistant",
  User = "user",
}

export interface CBChatMessage {
  role: CBChatMessageRole;
  content: string;
}

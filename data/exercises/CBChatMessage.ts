export enum CBChatMessageRole {
  // "assistant" is the OpenAI message role for the model, so this should be named "assistant" instead of "AI".
  AI = "assistant",
  User = "user",
}

export interface CBChatMessage {
  role: CBChatMessageRole;
  content: string;
}

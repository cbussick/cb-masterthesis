import { CBFreeformQuestionExerciseAIGenerated } from "./CBFreeformQuestionExercise";

export type CBAIQuestionExercise = Omit<
  CBFreeformQuestionExerciseAIGenerated,
  "id" | "topic" | "type"
>;

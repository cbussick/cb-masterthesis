import { CBFreeformQuestionExercise } from "./CBFreeformQuestionExercise";

export type CBAIQuestionExercise = Omit<
  CBFreeformQuestionExercise,
  "id" | "topic" | "type"
>;

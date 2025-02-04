import { CBQuizExercise } from "./CBQuizExercise";

export type CBAIQuizExercise = Omit<
  CBQuizExercise,
  "id" | "topic" | "type" | "image"
>;

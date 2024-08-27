import { CBTopic } from "../topics";
import { CBExerciseType } from "./CBExerciseType";

export interface CBIncorrectStaticExercise {
  id: string;
  topic: CBTopic;
  type: CBExerciseType;
}

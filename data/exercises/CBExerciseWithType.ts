import { CBTopic } from "../topics";
import { CBExerciseType } from "./CBExerciseType";

export interface CBExerciseWithTypeAndTopic {
  type: CBExerciseType;
  topic: CBTopic;
}

import { CBTopic } from "../topics";
import { CBExerciseType } from "./CBExerciseType";

export interface CBExerciseWithIDAndTypeAndTopic {
  id: string;
  type: CBExerciseType;
  topic: CBTopic;
}

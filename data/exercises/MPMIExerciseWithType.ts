import { MPMITopic } from "../topics";
import { MPMIExerciseType } from "./MPMIExerciseType";

export interface MPMIExerciseWithTypeAndTopic {
  type: MPMIExerciseType;
  topic: MPMITopic;
}

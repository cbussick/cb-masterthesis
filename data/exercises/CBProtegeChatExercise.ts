import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";

export interface CBProtegeChatExercise extends CBExerciseWithIDAndTypeAndTopic {
  type: CBExerciseType.ProtegeChat | CBExerciseType.ProtegeChatTeaching;
}

export type CBProtegeChatExerciseWithMetaData = CBProtegeChatExercise & {
  isCompleted: boolean;
};

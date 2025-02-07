import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";

export interface CBProtegeChatExercise extends CBExerciseWithIDAndTypeAndTopic {
  type: CBExerciseType.ProtegeChat;
}

export type CBProtegeChatExerciseWithMetaData = CBProtegeChatExercise & {
  isCompleted: boolean;
};

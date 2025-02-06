import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";

export interface CBProtegeChatExercise extends CBExerciseWithIDAndTypeAndTopic {
  /**
   * The term that the student should explain to the AI student.
   */
  term: string;
  type: CBExerciseType.ProtegeChat;
}

export type CBProtegeChatExerciseWithMetaData = CBProtegeChatExercise & {
  isCompleted: boolean;
};

import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";

export enum CBExerciseSequenceType {
  TopicWorld = "topic-world",
  ExamSimulator = "exam-simulator",
  FreePractice = "free-practice",
  RetryMistakes = "retry-mistakes",
}

export interface CBExerciseSequenceWrapperProps {
  exercises: CBExerciseWithMetaData[] | undefined;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteHref?: string;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete?: (params: any) => void;
  difficulty?: CBExerciseDifficulty;
  onCancel?: VoidFunction;
}

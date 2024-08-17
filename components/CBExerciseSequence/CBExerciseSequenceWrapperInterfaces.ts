import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { Dispatch, SetStateAction } from "react";
import { CBTime } from "../CBExerciseTimer/CBExerciseTimerInterfaces";

export enum CBExerciseSequenceType {
  TopicWorld = "topic-world",
  ExamSimulator = "exam-simulator",
  FreePractice = "free-practice",
  RetryMistakes = "retry-mistakes",
}

export interface CBExerciseSequenceWrapperProps {
  type: CBExerciseSequenceType;
  exercises: CBExerciseWithMetaData[] | undefined;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteHref?: string;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete?: (params: any) => void;
  setCompletionTime: Dispatch<SetStateAction<CBTime>>;
  difficulty?: CBExerciseDifficulty;
  onCancel?: VoidFunction;
}

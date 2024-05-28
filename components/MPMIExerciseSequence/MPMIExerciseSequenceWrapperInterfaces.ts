import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { MPMIMistakeExercise } from "@/firebase/UserCustomDataConverter";
import { Dispatch, SetStateAction } from "react";
import { MPMITime } from "../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";

export enum MPMIExerciseSequenceType {
  TopicWorld = "topic-world",
  ExamSimulator = "exam-simulator",
  FreePractice = "free-practice",
  RetryMistakes = "retry-mistakes",
}

export interface MPMIExerciseSequenceWrapperProps {
  type: MPMIExerciseSequenceType;
  exercises: MPMIExerciseWithMetaData[] | undefined;
  onMistake?: (exercise: MPMIMistakeExercise) => void;
  onCompleteHref?: string;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete?: (params: any) => void;
  setCompletionTime: Dispatch<SetStateAction<MPMITime>>;
  difficulty?: MPMIExerciseDifficulty;
  onCancel?: VoidFunction;
}

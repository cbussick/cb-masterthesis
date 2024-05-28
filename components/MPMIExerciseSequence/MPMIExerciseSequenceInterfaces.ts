import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { MPMIMistakeExercise } from "@/firebase/UserCustomDataConverter";
import { Dispatch, SetStateAction } from "react";
import { MPMITime } from "../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";
import { MPMIExerciseSequenceType } from "./MPMIExerciseSequenceWrapperInterfaces";

export interface MPMIExerciseSequenceProps {
  type: MPMIExerciseSequenceType;
  originalExercises: MPMIExerciseWithMetaData[];
  currentExerciseIndex: number;
  onMistake?: (exercise: MPMIMistakeExercise) => void;
  onCompleteHref?: string;
  onCompleteExercise: (exerciseId: string) => void;
  onSequenceComplete?: (params: any) => void;
  setCompletionTime?: Dispatch<SetStateAction<MPMITime>>;
  difficulty?: MPMIExerciseDifficulty;
  onCancel?: VoidFunction;
}

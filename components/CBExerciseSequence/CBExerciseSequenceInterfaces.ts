import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { Dispatch, SetStateAction } from "react";
import { CBTime } from "../CBExerciseTimer/CBExerciseTimerInterfaces";
import { CBExerciseSequenceType } from "./CBExerciseSequenceWrapperInterfaces";

export interface CBExerciseSequenceProps {
  type: CBExerciseSequenceType;
  originalExercises: CBExerciseWithMetaData[];
  currentExerciseIndex: number;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteHref?: string;
  onCompleteExercise: (exerciseId: string) => void;
  onSequenceComplete?: (params: any) => void;
  setCompletionTime?: Dispatch<SetStateAction<CBTime>>;
  difficulty?: CBExerciseDifficulty;
  onCancel?: VoidFunction;
}

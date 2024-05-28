import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { MPMIMistakeExercise } from "@/firebase/UserCustomDataConverter";
import { MutableRefObject } from "react";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";

export interface MPMIExerciseSequenceBottomBarProps {
  sequenceType: MPMIExerciseSequenceType;
  uncompletedExercises: MPMIExerciseWithMetaData[];
  onMistake?: (exercise: MPMIMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete?: (params?: any) => void;
  difficulty?: MPMIExerciseDifficulty;
  onCompleteHref?: string;
  onCancel?: VoidFunction;
  componentRef: MutableRefObject<any>;
  timerRef: MutableRefObject<any>;
}

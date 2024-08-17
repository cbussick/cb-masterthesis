import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { MutableRefObject } from "react";
import { CBExerciseSequenceType } from "../CBExerciseSequenceWrapperInterfaces";

export interface CBExerciseSequenceBottomBarProps {
  sequenceType: CBExerciseSequenceType;
  uncompletedExercises: CBExerciseWithMetaData[];
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete?: (params?: any) => void;
  difficulty?: CBExerciseDifficulty;
  onCompleteHref?: string;
  onCancel?: VoidFunction;
  componentRef: MutableRefObject<any>;
  timerRef: MutableRefObject<any>;
}

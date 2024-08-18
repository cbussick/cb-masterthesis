import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { MutableRefObject } from "react";

export interface CBExerciseSequenceBottomBarProps {
  uncompletedExercises: CBExerciseWithMetaData[];
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete?: (params?: any) => void;
  onCompleteHref?: string;
  onCancel?: VoidFunction;
  componentRef: MutableRefObject<any>;
}

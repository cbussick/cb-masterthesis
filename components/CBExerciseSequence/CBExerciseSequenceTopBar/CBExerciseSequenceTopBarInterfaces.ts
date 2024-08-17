import { Dispatch, SetStateAction } from "react";
import { CBTime } from "../../CBExerciseTimer/CBExerciseTimerInterfaces";

export interface CBExerciseSequenceTopBarProps {
  title: string;
  currentExerciseIndex: number;
  completedExercisesAmount: number;
  totalExercisesAmount: number;
  isSequenceFinished: boolean;
  setCompletionTime?: Dispatch<SetStateAction<CBTime>>;
}

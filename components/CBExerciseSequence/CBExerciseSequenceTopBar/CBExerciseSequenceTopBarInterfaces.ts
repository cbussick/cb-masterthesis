import { Dispatch, SetStateAction } from "react";
import { CBTime } from "../../CBExerciseTimer/CBExerciseTimerInterfaces";
import { CBExerciseSequenceType } from "../CBExerciseSequenceWrapperInterfaces";

export interface CBExerciseSequenceTopBarProps {
  title: string;
  currentExerciseIndex: number;
  completedExercisesAmount: number;
  totalExercisesAmount: number;
  type: CBExerciseSequenceType;
  sessionIsFinished: boolean;
  setCompletionTime?: Dispatch<SetStateAction<CBTime>>;
}

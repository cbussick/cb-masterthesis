import { Dispatch, SetStateAction } from "react";
import { MPMITime } from "../../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequenceWrapperInterfaces";

export interface MPMIExerciseSequenceTopBarProps {
  title: string;
  currentExerciseIndex: number;
  completedExercisesAmount: number;
  totalExercisesAmount: number;
  type: MPMIExerciseSequenceType;
  sessionIsFinished: boolean;
  setCompletionTime?: Dispatch<SetStateAction<MPMITime>>;
}

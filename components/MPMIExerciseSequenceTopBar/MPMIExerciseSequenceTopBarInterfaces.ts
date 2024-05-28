import { Dispatch, SetStateAction } from "react";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";
import { MPMITime } from "../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";

export interface MPMIExerciseSequenceTopBarProps {
  title: string;
  currentExerciseIndex: number;
  completedExercisesAmount: number;
  totalExercisesAmount: number;
  type: MPMIExerciseSequenceType;
  sessionIsFinished: boolean;
  setCompletionTime?: Dispatch<SetStateAction<MPMITime>>;
}

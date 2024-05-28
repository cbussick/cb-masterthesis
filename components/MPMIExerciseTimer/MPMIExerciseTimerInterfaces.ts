import { Dispatch, SetStateAction } from "react";

export interface MPMITime {
  sec: number;
  min: number;
}

export interface MPMIExerciseTimerProps {
  setCompletionTime: Dispatch<SetStateAction<MPMITime>>;
  isVisible: boolean;
}

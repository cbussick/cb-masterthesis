import { Dispatch, SetStateAction } from "react";

export interface CBTime {
  sec: number;
  min: number;
}

export interface CBExerciseTimerProps {
  setCompletionTime: Dispatch<SetStateAction<CBTime>>;
  isVisible: boolean;
}

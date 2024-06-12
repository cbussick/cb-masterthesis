import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { Dispatch, SetStateAction } from "react";
import { CBTime } from "../../CBExerciseTimer/CBExerciseTimerInterfaces";
import { CBExerciseWithCorrectness } from "../CBExamSimulatorInterfaces";

export interface CBExamSimulatorSequenceProps {
  originalExercises: CBExerciseWithMetaData[];
  setExercises: Dispatch<SetStateAction<CBExerciseWithCorrectness[]>>;
  onSequenceComplete: VoidFunction;
  setCompletionTime: Dispatch<SetStateAction<CBTime>>;
  onCancel: VoidFunction;
}

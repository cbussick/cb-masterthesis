import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import { Dispatch, SetStateAction } from "react";
import { MPMIExerciseWithCorrectness } from "../MPMIExamSimulator/MPMIExamSimulatorInterfaces";
import { MPMITime } from "../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";

export interface MPMIExamSimulatorSequenceProps {
  originalExercises: MPMIExerciseWithMetaData[];
  setExercises: Dispatch<SetStateAction<MPMIExerciseWithCorrectness[]>>;
  onSequenceComplete: VoidFunction;
  setCompletionTime: Dispatch<SetStateAction<MPMITime>>;
  onCancel: VoidFunction;
}

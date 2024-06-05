import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import { Dispatch, SetStateAction } from "react";
import { MPMITime } from "../../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";
import { MPMIExerciseWithCorrectness } from "../MPMIExamSimulatorInterfaces";

export interface MPMIExamSimulatorSequenceProps {
  originalExercises: MPMIExerciseWithMetaData[];
  setExercises: Dispatch<SetStateAction<MPMIExerciseWithCorrectness[]>>;
  onSequenceComplete: VoidFunction;
  setCompletionTime: Dispatch<SetStateAction<MPMITime>>;
  onCancel: VoidFunction;
}

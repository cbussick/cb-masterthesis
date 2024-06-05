import { MPMITime } from "../../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";
import { MPMIExerciseWithCorrectness } from "../MPMIExamSimulatorInterfaces";

export interface MPMIExamSimulatorEndScreenProps {
  exercises: MPMIExerciseWithCorrectness[];
  completionTime: MPMITime;
  onRetry: (falseIDs: MPMIExerciseWithCorrectness[]) => void;
  onStartNewExam: VoidFunction;
}

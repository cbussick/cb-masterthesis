import { MPMIExerciseWithCorrectness } from "../MPMIExamSimulator/MPMIExamSimulatorInterfaces";
import { MPMITime } from "../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";

export interface MPMIExamSimulatorEndScreenProps {
  exercises: MPMIExerciseWithCorrectness[];
  completionTime: MPMITime;
  onRetry: (falseIDs: MPMIExerciseWithCorrectness[]) => void;
  onStartNewExam: VoidFunction;
}

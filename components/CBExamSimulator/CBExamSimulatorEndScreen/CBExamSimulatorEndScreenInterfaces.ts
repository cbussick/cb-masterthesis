import { CBTime } from "../../CBExerciseTimer/CBExerciseTimerInterfaces";
import { CBExerciseWithCorrectness } from "../CBExamSimulatorInterfaces";

export interface CBExamSimulatorEndScreenProps {
  exercises: CBExerciseWithCorrectness[];
  completionTime: CBTime;
  onRetry: (falseIDs: CBExerciseWithCorrectness[]) => void;
  onStartNewExam: VoidFunction;
}

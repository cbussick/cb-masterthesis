import { CBExerciseWithCorrectness } from "../CBExamSimulatorInterfaces";

export interface CBExamSimulatorEndScreenProps {
  exercises: CBExerciseWithCorrectness[];
  passedSeconds: number;
  onRetry: (falseIDs: CBExerciseWithCorrectness[]) => void;
  onStartNewExam: VoidFunction;
}

import { CBExam } from "@/data/examSimulator";
import { CBExercise } from "@/data/exercises/CBExercise";

export enum CBExamSimulatorState {
  NotStarted = "not-started",
  Started = "started",
  Finished = "finished",
}

export type CBExerciseWithCorrectness = CBExercise & {
  isCorrect: boolean;
};

export interface CBExamSimulatorProps {
  exams: CBExam[];
}

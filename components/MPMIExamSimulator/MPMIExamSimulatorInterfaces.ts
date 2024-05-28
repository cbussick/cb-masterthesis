import { MPMIExam } from "@/data/examSimulator";
import { MPMIExercise } from "@/data/exercises/MPMIExercise";

export enum MPMIExamSimulatorState {
  NotStarted = "not-started",
  Started = "started",
  Finished = "finished",
}

export type MPMIExerciseWithCorrectness = MPMIExercise & {
  isCorrect: boolean;
};

export interface MPMIExamSimulatorProps {
  exams: MPMIExam[];
}

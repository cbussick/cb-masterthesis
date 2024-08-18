import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";

export interface CBExerciseSequenceProps {
  originalExercises: CBExerciseWithMetaData[];
  currentExerciseIndex: number;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteHref?: string;
  onCompleteExercise: (exerciseId: string) => void;
  onSequenceComplete?: (params: any) => void;
  difficulty?: CBExerciseDifficulty;
  onCancel?: VoidFunction;
}

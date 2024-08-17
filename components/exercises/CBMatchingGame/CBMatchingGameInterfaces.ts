import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBMatchingGameExerciseWithMetaData } from "@/data/exercises/CBMatchingGameExercise";

export interface CBMatchingGameProps {
  exercise: CBMatchingGameExerciseWithMetaData;
  onCompleteExercise: (params: any) => void;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
}

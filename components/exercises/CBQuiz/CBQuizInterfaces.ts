import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBQuizExerciseWithMetaData } from "@/data/exercises/CBQuizExercise";

export interface CBQuizProps {
  exercise: CBQuizExerciseWithMetaData;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
}

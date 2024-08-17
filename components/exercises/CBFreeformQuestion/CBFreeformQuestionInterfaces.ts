import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBFreeformQuestionExerciseWithMetaData } from "@/data/exercises/CBFreeformQuestionExercise";

export interface CBFreeformQuestionProps {
  exercise: CBFreeformQuestionExerciseWithMetaData;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
}

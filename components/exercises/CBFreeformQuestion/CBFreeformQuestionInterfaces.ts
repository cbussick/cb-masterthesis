import { CBFreeformQuestionExercise } from "@/data/exercises/CBFreeformQuestionExercise";
import { CBMistakeExercise } from "@/firebase/UserCustomDataConverter";

export interface CBFreeformQuestionProps {
  exercise: CBFreeformQuestionExercise;
  onMistake?: (exercise: CBMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
}

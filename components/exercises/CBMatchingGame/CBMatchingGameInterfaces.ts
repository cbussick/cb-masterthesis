import { CBMatchingGameExercise } from "@/data/exercises/CBMatchingGameExercise";
import { CBMistakeExercise } from "@/firebase-client/UserCustomDataConverter";

export interface CBMatchingGameProps {
  exercise: CBMatchingGameExercise;
  onCompleteExercise: (params: any) => void;
  onMistake?: (exercise: CBMistakeExercise) => void;
}

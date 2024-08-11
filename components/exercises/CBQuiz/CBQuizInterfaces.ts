import { CBQuizExercise } from "@/data/exercises/CBQuizExercise";
import { CBMistakeExercise } from "@/firebase-client/UserCustomDataConverter";

export interface CBQuizProps {
  exercise: CBQuizExercise;
  onMistake?: (exercise: CBMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
}

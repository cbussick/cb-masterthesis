import { MPMIQuizExercise } from "@/data/exercises/MPMIQuizExercise";
import { MPMIMistakeExercise } from "@/firebase/UserCustomDataConverter";

export interface MPMIQuizProps {
  exercise: MPMIQuizExercise;
  onMistake?: (exercise: MPMIMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
}

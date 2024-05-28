import { MPMIFreeformQuestionExercise } from "@/data/exercises/MPMIFreeformQuestionExercise";
import { MPMIMistakeExercise } from "@/firebase/UserCustomDataConverter";

export interface MPMIFreeformQuestionProps {
  exercise: MPMIFreeformQuestionExercise;
  onMistake?: (exercise: MPMIMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
}

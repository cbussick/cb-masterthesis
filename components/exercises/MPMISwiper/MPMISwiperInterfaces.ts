import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { MPMISwiperExercise } from "@/data/exercises/MPMISwiperExercise";
import { MPMIMistakeExercise } from "@/firebase/UserCustomDataConverter";

export interface MPMISwiperProps {
  exercise: MPMISwiperExercise;
  onMistake?: (exercise: MPMIMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
  difficulty?: MPMIExerciseDifficulty;
}

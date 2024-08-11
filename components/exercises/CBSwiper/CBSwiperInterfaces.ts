import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { CBSwiperExercise } from "@/data/exercises/CBSwiperExercise";
import { CBMistakeExercise } from "@/firebase-client/UserCustomDataConverter";

export interface CBSwiperProps {
  exercise: CBSwiperExercise;
  onMistake?: (exercise: CBMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
  difficulty?: CBExerciseDifficulty;
}

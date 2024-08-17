import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { CBSwiperExerciseWithMetaData } from "@/data/exercises/CBSwiperExercise";

export interface CBSwiperProps {
  exercise: CBSwiperExerciseWithMetaData;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
  difficulty?: CBExerciseDifficulty;
}

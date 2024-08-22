import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export interface CBSwiperCardProps {
  name: string;
  image?: CBImgWithAlt;
  difficulty?: CBExerciseDifficulty;
  isExerciseFinished: boolean;
}

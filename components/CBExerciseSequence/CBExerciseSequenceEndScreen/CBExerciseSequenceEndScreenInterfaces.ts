import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { CBExerciseSequenceType } from "../CBExerciseSequenceWrapperInterfaces";

export interface CBExerciseSequenceEndScreenProps {
  difficulty?: CBExerciseDifficulty;
  type: CBExerciseSequenceType;
  onCompleteHref?: string;
}

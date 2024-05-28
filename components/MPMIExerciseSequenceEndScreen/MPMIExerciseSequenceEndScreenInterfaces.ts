import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";

export interface MPMIExerciseSequenceEndScreenProps {
  difficulty?: MPMIExerciseDifficulty;
  type: MPMIExerciseSequenceType;
  onCompleteHref?: string;
}

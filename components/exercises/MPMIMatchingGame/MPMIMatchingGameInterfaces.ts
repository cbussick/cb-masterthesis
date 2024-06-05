import { MPMIMatchingGameExercise } from "@/data/exercises/MPMIMatchingGameExercise";
import { MPMIExerciseSequenceType } from "../../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";

export interface MPMIMatchingGameProps {
  exercise: MPMIMatchingGameExercise;
  sequenceType: MPMIExerciseSequenceType;
}

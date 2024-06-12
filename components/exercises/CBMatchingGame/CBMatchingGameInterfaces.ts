import { CBMatchingGameExercise } from "@/data/exercises/CBMatchingGameExercise";
import { CBExerciseSequenceType } from "../../CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";

export interface CBMatchingGameProps {
  exercise: CBMatchingGameExercise;
  sequenceType: CBExerciseSequenceType;
}

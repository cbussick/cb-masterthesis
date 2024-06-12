import { CBFamilyTreeExercise } from "@/data/exercises/CBFamilyTreeExercise";
import { MutableRefObject } from "react";
import { CBExerciseSequenceType } from "../../../CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";

export interface CBFamilyTreeWithProvidersProps {
  exercise: CBFamilyTreeExercise;
  sequenceType: CBExerciseSequenceType;
  componentRef: MutableRefObject<undefined>;
}

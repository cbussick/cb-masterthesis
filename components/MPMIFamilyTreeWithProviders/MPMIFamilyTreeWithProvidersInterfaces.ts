import { MPMIFamilyTreeExercise } from "@/data/exercises/MPMIFamilyTreeExercise";
import { MutableRefObject } from "react";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";

export interface MPMIFamilyTreeWithProvidersProps {
  exercise: MPMIFamilyTreeExercise;
  sequenceType: MPMIExerciseSequenceType;
  componentRef: MutableRefObject<undefined>;
}

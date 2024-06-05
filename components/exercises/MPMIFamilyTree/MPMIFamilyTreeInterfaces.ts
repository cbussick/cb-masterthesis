import { MPMIFamilyTreeExercise } from "@/data/exercises/MPMIFamilyTreeExercise";
import { MPMIExerciseSequenceType } from "../../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";

export enum MPMINodeType {
  FamilyTreeNode = "familyTreeNode",
  FamilyTreePairNode = "familyTreePairNode",
}

export interface MPMIFamilyTreeProps {
  exercise: MPMIFamilyTreeExercise;
  sequenceType: MPMIExerciseSequenceType;
}

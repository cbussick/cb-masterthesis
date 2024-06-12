import { CBFamilyTreeExercise } from "@/data/exercises/CBFamilyTreeExercise";
import { CBExerciseSequenceType } from "../../CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";

export enum CBNodeType {
  FamilyTreeNode = "familyTreeNode",
  FamilyTreePairNode = "familyTreePairNode",
}

export interface CBFamilyTreeProps {
  exercise: CBFamilyTreeExercise;
  sequenceType: CBExerciseSequenceType;
}

import { CBFamilyTreeExercise } from "@/data/exercises/CBFamilyTreeExercise";

export enum CBNodeType {
  FamilyTreeNode = "familyTreeNode",
  FamilyTreePairNode = "familyTreePairNode",
}

export interface CBFamilyTreeProps {
  exercise: CBFamilyTreeExercise;
}

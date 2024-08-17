import { CBFamilyTreeExercise } from "@/data/exercises/CBFamilyTreeExercise";
import { CBMistakeExercise } from "@/firebase-client/UserCustomDataConverter";

export enum CBNodeType {
  FamilyTreeNode = "familyTreeNode",
  FamilyTreePairNode = "familyTreePairNode",
}

export interface CBFamilyTreeProps {
  exercise: CBFamilyTreeExercise;
  onCompleteExercise: (params: any) => void;
  onMistake?: (exercise: CBMistakeExercise) => void;
}

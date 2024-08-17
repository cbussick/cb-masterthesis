import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBFamilyTreeExerciseWithMetaData } from "@/data/exercises/CBFamilyTreeExercise";

export enum CBNodeType {
  FamilyTreeNode = "familyTreeNode",
  FamilyTreePairNode = "familyTreePairNode",
}

export interface CBFamilyTreeProps {
  exercise: CBFamilyTreeExerciseWithMetaData;
  onCompleteExercise: (params: any) => void;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
}

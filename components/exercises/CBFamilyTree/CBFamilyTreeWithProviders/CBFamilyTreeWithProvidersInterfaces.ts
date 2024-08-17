import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBFamilyTreeExerciseWithMetaData } from "@/data/exercises/CBFamilyTreeExercise";
import { MutableRefObject } from "react";

export interface CBFamilyTreeWithProvidersProps {
  exercise: CBFamilyTreeExerciseWithMetaData;
  onCompleteExercise: (params: any) => void;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  componentRef: MutableRefObject<undefined>;
}

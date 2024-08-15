import { CBFamilyTreeExercise } from "@/data/exercises/CBFamilyTreeExercise";
import { CBMistakeExercise } from "@/firebase-client/UserCustomDataConverter";
import { MutableRefObject } from "react";

export interface CBFamilyTreeWithProvidersProps {
  exercise: CBFamilyTreeExercise;
  onCompleteExercise: (params: any) => void;
  onMistake?: (exercise: CBMistakeExercise) => void;
  componentRef: MutableRefObject<undefined>;
}

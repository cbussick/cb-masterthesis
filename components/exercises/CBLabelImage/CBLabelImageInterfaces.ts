import { CBLabelImageExerciseWithMetaData } from "@/data/exercises/CBLabelImageExercise";

export interface CBLabelImageProps {
  exercise: CBLabelImageExerciseWithMetaData;
  onMistake?: (exercise: CBLabelImageExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
}

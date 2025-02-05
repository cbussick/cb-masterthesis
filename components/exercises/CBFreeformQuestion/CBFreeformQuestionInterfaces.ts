import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import {
  CBFreeformQuestionExerciseWithCorrectAnswerWithMetaData,
  CBFreeformQuestionExerciseWithMetaData,
} from "@/data/exercises/CBFreeformQuestionExercise";

export interface CBFreeformQuestionProps {
  exercise:
    | CBFreeformQuestionExerciseWithMetaData
    | CBFreeformQuestionExerciseWithCorrectAnswerWithMetaData;
  onMistake?: (exercise: CBExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
}

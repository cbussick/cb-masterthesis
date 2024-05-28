import { MPMIExerciseType } from "./MPMIExerciseType";
import { MPMIFamilyTreeExercise } from "./MPMIFamilyTreeExercise";
import { MPMIFreeformQuestionExercise } from "./MPMIFreeformQuestionExercise";
import { MPMIMatchingGameExercise } from "./MPMIMatchingGameExercise";
import { MPMIQuizExercise } from "./MPMIQuizExercise";
import { MPMISwiperExercise } from "./MPMISwiperExercise";

export type MPMIExercise =
  | MPMIQuizExercise
  | MPMIFamilyTreeExercise
  | MPMIMatchingGameExercise
  | MPMISwiperExercise
  | MPMIFreeformQuestionExercise;

export type MPMIExerciseWithMetaData = MPMIExercise & { isCompleted: boolean };

export interface MPMIExerciseData {
  name: string;
}

export const exercisesData: Record<MPMIExerciseType, MPMIExerciseData> = {
  [MPMIExerciseType.Quiz]: { name: "Quiz" },
  [MPMIExerciseType.FamilyTree]: { name: "Stammbaumanalyse" },
  [MPMIExerciseType.MatchingGame]: { name: "Zuordnungsspiel" },
  [MPMIExerciseType.Swiper]: { name: "Zellen-Swiper" },
  [MPMIExerciseType.FreeformQuestion]: { name: "Freitext-Frage" },
};

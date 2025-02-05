import { CBExerciseType } from "./CBExerciseType";
import { CBFamilyTreeExercise } from "./CBFamilyTreeExercise";
import { CBFreeformQuestionExercise } from "./CBFreeformQuestionExercise";
import { CBLabelImageExercise } from "./CBLabelImageExercise";
import { CBMatchingGameExercise } from "./CBMatchingGameExercise";
import { CBQuizExercise } from "./CBQuizExercise";
import { CBSwiperExercise } from "./CBSwiperExercise";

export type CBExercise =
  | CBQuizExercise
  | CBFamilyTreeExercise
  | CBMatchingGameExercise
  | CBSwiperExercise
  | CBFreeformQuestionExercise
  | CBLabelImageExercise;

export type CBExerciseWithMetaData = CBExercise & { isCompleted: boolean };

export interface CBExerciseData {
  name: string;
}

export const exercisesData: Record<CBExerciseType, CBExerciseData> = {
  [CBExerciseType.Quiz]: { name: "Quiz" },
  [CBExerciseType.FamilyTree]: { name: "Stammbaumanalyse" },
  [CBExerciseType.MatchingGame]: { name: "Zuordnungsspiel" },
  [CBExerciseType.Swiper]: { name: "Zellen-Swiper" },
  [CBExerciseType.FreeformQuestion]: { name: "Freitext-Frage" },
  [CBExerciseType.AIGeneratedQuestion]: { name: "KI-generierte Fragen" },
  [CBExerciseType.AIQuiz]: { name: "KI-Quiz" },
  [CBExerciseType.LabelImage]: { name: "Bild beschriften" },
  [CBExerciseType.LabelImageVariation]: {
    name: "Bild beschriften (Variation)",
  },
};

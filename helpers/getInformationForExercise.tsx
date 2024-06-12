import { CBExercise } from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBFamilyTreeExercise } from "@/data/exercises/CBFamilyTreeExercise";
import { CBFreeformQuestionExercise } from "@/data/exercises/CBFreeformQuestionExercise";
import { CBMatchingGameExercise } from "@/data/exercises/CBMatchingGameExercise";
import { CBQuizExercise } from "@/data/exercises/CBQuizExercise";

/**
 * Returns the correct component and title for the given exercise.
 */
export const getInformationForExercise = (
  exercise?: CBExercise,
): { title: string } | null => {
  if (exercise?.type === CBExerciseType.Quiz) {
    const castExercise = exercise as CBQuizExercise;
    return {
      title: castExercise.question,
    };
  }
  if (exercise?.type === CBExerciseType.FamilyTree) {
    const castExercise = exercise as CBFamilyTreeExercise;
    return {
      title: castExercise.description,
    };
  }
  if (exercise?.type === CBExerciseType.MatchingGame) {
    const castExercise = exercise as CBMatchingGameExercise;

    return {
      title: castExercise.title,
    };
  }
  if (exercise?.type === CBExerciseType.Swiper) {
    return {
      title: "Ordne die Zellorganellen den richtigen Zelltypen zu.",
    };
  }
  if (exercise?.type === CBExerciseType.FreeformQuestion) {
    const castExercise = exercise as CBFreeformQuestionExercise;

    return {
      title: castExercise.question,
    };
  }
  return null;
};

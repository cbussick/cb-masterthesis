import { MPMIExercise } from "@/data/exercises/MPMIExercise";
import { MPMIExerciseType } from "@/data/exercises/MPMIExerciseType";
import { MPMIFamilyTreeExercise } from "@/data/exercises/MPMIFamilyTreeExercise";
import { MPMIFreeformQuestionExercise } from "@/data/exercises/MPMIFreeformQuestionExercise";
import { MPMIMatchingGameExercise } from "@/data/exercises/MPMIMatchingGameExercise";
import { MPMIQuizExercise } from "@/data/exercises/MPMIQuizExercise";

/**
 * Returns the correct component and title for the given exercise.
 */
export const getInformationForExercise = (
  exercise?: MPMIExercise,
): { title: string } | null => {
  if (exercise?.type === MPMIExerciseType.Quiz) {
    const castExercise = exercise as MPMIQuizExercise;
    return {
      title: castExercise.question,
    };
  }
  if (exercise?.type === MPMIExerciseType.FamilyTree) {
    const castExercise = exercise as MPMIFamilyTreeExercise;
    return {
      title: castExercise.description,
    };
  }
  if (exercise?.type === MPMIExerciseType.MatchingGame) {
    const castExercise = exercise as MPMIMatchingGameExercise;

    return {
      title: castExercise.title,
    };
  }
  if (exercise?.type === MPMIExerciseType.Swiper) {
    return {
      title: "Ordne die Zellorganellen den richtigen Zelltypen zu.",
    };
  }
  if (exercise?.type === MPMIExerciseType.FreeformQuestion) {
    const castExercise = exercise as MPMIFreeformQuestionExercise;

    return {
      title: castExercise.question,
    };
  }
  return null;
};

import { glossaryEntries } from "../glossaryEntries";
import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";
import { quizExercises } from "./CBQuizExercise";

export interface CBFreeformQuestionExercise
  extends CBExerciseWithIDAndTypeAndTopic {
  question: string;
  type: CBExerciseType.FreeformQuestion | CBExerciseType.AIGeneratedQuestion;
  definition: string;
}

export type CBFreeformQuestionExerciseWithMetaData =
  CBFreeformQuestionExercise & { isCompleted: boolean };

export const freeformQuestionExercises: CBFreeformQuestionExercise[] =
  quizExercises
    .filter((exercise) => exercise.definitionId && exercise.definitionId !== "")
    .map((exercise) => ({
      id: `freeform-${exercise.id}`,
      type: CBExerciseType.FreeformQuestion,
      topic: exercise.topic,
      question: exercise.question,
      // We can cast here, because we filter out exercises without a definition beforehand.
      definition: glossaryEntries.find(
        (entry) => entry.id === exercise.definitionId,
      )?.definition as string,
    }));

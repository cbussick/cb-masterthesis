import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithTypeAndTopic } from "./CBExerciseWithType";
import { quizExercises } from "./CBQuizExercise";

export interface CBFreeformQuestionExercise extends CBExerciseWithTypeAndTopic {
  id: string;
  question: string;
  hint: string;
}

export type CBFreeformQuestionExerciseWithMetaData =
  CBFreeformQuestionExercise & { isCompleted: boolean };

export const freeformQuestionExercises: CBFreeformQuestionExercise[] =
  quizExercises.map((exercise) => ({
    id: `freeform-${exercise.id}`,
    type: CBExerciseType.FreeformQuestion,
    topic: exercise.topic,
    question: exercise.question,
    hint: exercise.hint,
  }));

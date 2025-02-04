import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";
import { quizExercises } from "./CBQuizExercise";

export interface CBFreeformQuestionExercise
  extends CBExerciseWithIDAndTypeAndTopic {
  question: string;
  type: CBExerciseType.FreeformQuestion;
}

export type CBFreeformQuestionExerciseWithMetaData =
  CBFreeformQuestionExercise & { isCompleted: boolean };

export const freeformQuestionExercises: CBFreeformQuestionExercise[] =
  quizExercises.map((exercise) => ({
    id: `freeform-${exercise.id}`,
    type: CBExerciseType.FreeformQuestion,
    topic: exercise.topic,
    question: exercise.question,
  }));

import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";
import { quizExercises } from "./CBQuizExercise";

export interface CBFreeformQuestionExerciseAIGenerated
  extends CBExerciseWithIDAndTypeAndTopic {
  question: string;
  type:
    | CBExerciseType.FreeformQuestionWithCorrectAnswer
    | CBExerciseType.AIGeneratedQuestion;
  definition: string;
}
export interface CBFreeformQuestionExerciseWithCorrectAnswer
  extends CBExerciseWithIDAndTypeAndTopic {
  question: string;
  type: CBExerciseType.FreeformQuestionWithCorrectAnswer;
  answer?: string;
}

export type CBFreeformQuestionExerciseWithMetaData =
  CBFreeformQuestionExerciseAIGenerated & { isCompleted: boolean };
export type CBFreeformQuestionExerciseWithCorrectAnswerWithMetaData =
  CBFreeformQuestionExerciseWithCorrectAnswer & { isCompleted: boolean };

export const freeformQuestionExercisesWithCorrectAnswer: CBFreeformQuestionExerciseWithCorrectAnswer[] =
  quizExercises.map((exercise) => ({
    id: `freeform-${exercise.id}`,
    type: CBExerciseType.FreeformQuestionWithCorrectAnswer,
    topic: exercise.topic,
    question: exercise.question,
    answer: exercise.answers.find((a) => a.id === exercise.correctAnswer)?.text,
  }));

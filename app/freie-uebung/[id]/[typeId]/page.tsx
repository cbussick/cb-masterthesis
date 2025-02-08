"use client";

import { CBFreePracticeExerciseSequence } from "@/components/CBFreePracticeExerciseSequence/CBFreePracticeExerciseSequence";
import {
  CBExercise,
  CBExerciseWithMetaData,
} from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { familyTreeExercises } from "@/data/exercises/CBFamilyTreeExercise";
import { freeformQuestionExercisesWithCorrectAnswer } from "@/data/exercises/CBFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/CBMatchingGameExercise";
import { quizExercises } from "@/data/exercises/CBQuizExercise";
import { swiperExercises } from "@/data/exercises/CBSwiperExercise";
import { glossaryEntries } from "@/data/glossaryEntries";
import { CBTopic } from "@/data/topics";
import { addIncorrectExercise } from "@/firebase-client/addIncorrectExercise";
import { CBIncorrectExercise } from "@/firebase-client/incorrectExercisesConverter";
import { makeUpdatedTrackedTime } from "@/firebase-client/makeUpdatedTrackedTime";
import { removeIncorrectExercise } from "@/firebase-client/removeIncorrectExercise";
import { updateUser } from "@/firebase-client/updateUser";
import { CBUserCustomData } from "@/firebase-client/userCustomDataConverter";
import { useUser } from "@/firebase-client/useUser";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { useGenerateAILabelImageExerciseQuery } from "@/helpers/queries/useGenerateAIImageQuery";
import { useGenerateAIQuestionQuery } from "@/helpers/queries/useGenerateAIQuestionQuery";
import { useGenerateAIQuizQuery } from "@/helpers/queries/useGenerateAIQuizQuery";
import { retryMistakesPathSegment } from "@/helpers/routes";
import { dayjsLocalized } from "@/helpers/time-tracking/dayjsLocalized";
import { useSnackbar } from "@/ui/useSnackbar";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface FreePracticeSequenceParams {
  params: {
    id: string;
    typeId: string;
  };
}

const exercisesMap: Record<CBExerciseType, CBExercise[]> = {
  [CBExerciseType.Quiz]: quizExercises,
  [CBExerciseType.AIQuiz]: [],
  [CBExerciseType.FamilyTree]: familyTreeExercises,
  [CBExerciseType.MatchingGame]: matchingGameExercises,
  [CBExerciseType.Swiper]: swiperExercises,
  [CBExerciseType.FreeformQuestionWithCorrectAnswer]:
    freeformQuestionExercisesWithCorrectAnswer,
  [CBExerciseType.AIGeneratedQuestion]: [],
  [CBExerciseType.LabelImage]: [],
  [CBExerciseType.LabelImageVariation]: [],
  [CBExerciseType.ProtegeChat]: [],
  [CBExerciseType.ProtegeChatTeaching]: [],
};

const exerciseAmountMap: Record<CBExerciseType, number> = {
  [CBExerciseType.Quiz]: 10,
  [CBExerciseType.AIQuiz]: 10,
  [CBExerciseType.FamilyTree]: 2,
  [CBExerciseType.MatchingGame]: 5,
  [CBExerciseType.Swiper]: 10,
  [CBExerciseType.FreeformQuestionWithCorrectAnswer]: 10,
  [CBExerciseType.AIGeneratedQuestion]: 10,
  [CBExerciseType.LabelImage]: 1,
  [CBExerciseType.LabelImageVariation]: 1,
  [CBExerciseType.ProtegeChat]: 1,
  [CBExerciseType.ProtegeChatTeaching]: 1,
};

const getRandomExercises = (
  amountOfExercises: number,
  exercises: CBExerciseWithMetaData[],
): CBExerciseWithMetaData[] => {
  const randomExercises: CBExerciseWithMetaData[] = [];
  const usedIndexes: number[] = [];
  let i = 0;
  while (i < amountOfExercises) {
    const randomIndex = Math.floor(Math.random() * exercises.length);
    if (!usedIndexes.includes(randomIndex)) {
      const randomExercise = exercises[randomIndex];

      usedIndexes.push(randomIndex);
      randomExercises.push(randomExercise);
      i += 1;
    }
  }

  return randomExercises;
};

export default function FreePracticeSequencePage({
  params,
}: FreePracticeSequenceParams) {
  const topic = getEnumValueByStringValue(CBTopic, params.id);

  if (!topic) {
    notFound();
  }

  const exerciseType = getEnumValueByStringValue(CBExerciseType, params.typeId);

  const definitionsForAIQuestions = glossaryEntries
    .filter((entry) => entry.topic === topic)
    .map((entry) => entry.definition)
    .sort(() => Math.random() - 0.5)
    .slice(undefined, exerciseAmountMap[CBExerciseType.AIGeneratedQuestion]);

  const { user, customData, incorrectExercises } = useUser();
  const { showSnackbar } = useSnackbar();
  const {
    data: generatedAIGeneratedQuestionData,
    status: generatedAIGeneratedQuestionStatus,
    error: generatedAIGeneratedQuestionError,
  } = useGenerateAIQuestionQuery(
    topic,
    definitionsForAIQuestions,
    exerciseType === CBExerciseType.AIGeneratedQuestion,
  );
  const {
    data: generatedAIQuizData,
    status: generatedAIQuizStatus,
    error: generatedAIQuizError,
  } = useGenerateAIQuizQuery(
    topic,
    exerciseAmountMap[CBExerciseType.AIQuiz],
    exerciseType === CBExerciseType.AIQuiz,
  );

  const {
    data: generatedAIImageData,
    status: generatedAIImageStatus,
    error: generatedAIImageError,
  } = useGenerateAILabelImageExerciseQuery(
    topic,
    exerciseType === CBExerciseType.LabelImage ||
      exerciseType === CBExerciseType.LabelImageVariation,
    exerciseType === CBExerciseType.LabelImageVariation,
  );

  const [exercises, setExercises] = useState<CBExerciseWithMetaData[]>([]);

  const isRetryingMistakes = params.typeId === retryMistakesPathSegment;

  useEffect(() => {
    let exercisesWithMetaData: CBExerciseWithMetaData[] = [];

    if (isRetryingMistakes) {
      incorrectExercises
        .filter((e) => e.topic === topic)
        .forEach((e) => {
          let exercise: CBExercise | undefined;
          if (e.type === CBExerciseType.AIQuiz) {
            exercise = e as CBExercise;
          } else {
            exercise = exercisesMap[e.type].find((ex) => ex.id === e.id);
          }

          if (exercise) {
            const exerciseWithMetaData: CBExerciseWithMetaData = {
              ...exercise,
              isCompleted: false,
            };
            exercisesWithMetaData.push(exerciseWithMetaData);
          }
        });

      const amountOfExercises =
        exercisesWithMetaData.length < 5 ? exercisesWithMetaData.length : 5;

      const randomExercises: CBExerciseWithMetaData[] = getRandomExercises(
        amountOfExercises,
        exercisesWithMetaData,
      );

      setExercises(randomExercises);
    } else if (exerciseType === CBExerciseType.AIQuiz) {
      if (generatedAIQuizData) {
        exercisesWithMetaData = generatedAIQuizData.map((quiz) => ({
          ...quiz,
          isCompleted: false,
        }));

        setExercises(exercisesWithMetaData);
      }
    } else if (exerciseType === CBExerciseType.AIGeneratedQuestion) {
      if (generatedAIGeneratedQuestionData) {
        exercisesWithMetaData = generatedAIGeneratedQuestionData.map(
          (question) => ({
            ...question,
            isCompleted: false,
          }),
        );

        setExercises(exercisesWithMetaData);
      }
    } else if (
      exerciseType === CBExerciseType.LabelImage ||
      exerciseType === CBExerciseType.LabelImageVariation
    ) {
      if (generatedAIImageData) {
        exercisesWithMetaData.push({
          ...generatedAIImageData,
          isCompleted: false,
        });

        setExercises(exercisesWithMetaData);
      }
    } else if (
      exerciseType === CBExerciseType.ProtegeChat ||
      exerciseType === CBExerciseType.ProtegeChatTeaching
    ) {
      exercisesWithMetaData.push({
        id: "1",
        topic,
        type: exerciseType,
        isCompleted: false,
      });

      setExercises(exercisesWithMetaData);
    } else if (exerciseType) {
      exercisesWithMetaData = exercisesMap[exerciseType]
        .filter((e) => e.topic === topic)
        .map((ex) => ({ ...ex, isCompleted: false }));

      const desiredAmountOfExercises = exerciseAmountMap[exerciseType];

      const amountOfExercises =
        exercisesWithMetaData.length < desiredAmountOfExercises
          ? exercisesWithMetaData.length
          : desiredAmountOfExercises;

      const randomExercises: CBExerciseWithMetaData[] = getRandomExercises(
        amountOfExercises,
        exercisesWithMetaData,
      );

      setExercises(randomExercises);
    }
    // Don't add anything from `user` to dependencies, because it would trigger
    // a new selection of random exercises, while the user is still inside the sequence.
    // This would cause glitches for the user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    exerciseType,
    isRetryingMistakes,
    showSnackbar,
    topic,
    generatedAIQuizData,
    generatedAIGeneratedQuestionData,
    generatedAIImageData,
  ]);

  const onMistake = useCallback(
    (exercise: CBExerciseWithMetaData) => {
      const isNotAlreadyInIncorrectExercises =
        incorrectExercises.find(
          (e) => e.id === exercise.id && e.topic === exercise.topic,
        ) === undefined;

      if (isNotAlreadyInIncorrectExercises) {
        let incorrectExerciseToAdd: CBIncorrectExercise;
        if (exercise.type === CBExerciseType.AIQuiz) {
          const { isCompleted, ...exerciseWithoutMetadata } = exercise;
          incorrectExerciseToAdd = exerciseWithoutMetadata;
        } else {
          incorrectExerciseToAdd = {
            id: exercise.id,
            topic: exercise.topic,
            type: exercise.type,
          };
        }

        addIncorrectExercise(user.uid, incorrectExerciseToAdd);
      }
    },
    [incorrectExercises, user.uid],
  );

  const onCompleteExercise = useCallback(
    (parameters: { exerciseId: string; isCorrect: boolean }) => {
      const { uid } = user;

      const newUserData: Partial<CBUserCustomData> = {
        solvedExercises: customData.solvedExercises + 1,
        points: customData.points + 1,
      };

      // If the exercise type is not set, the user is retrying mistakes
      if (isRetryingMistakes) {
        const exercise = incorrectExercises.find(
          (e) => e.id === parameters.exerciseId,
        );

        if (exercise) {
          removeIncorrectExercise(uid, exercise?.id);
        }
      }
      updateUser(uid, newUserData);
    },
    [
      customData.points,
      customData.solvedExercises,
      incorrectExercises,
      isRetryingMistakes,
      user,
    ],
  );

  const beginTime = useMemo(() => dayjsLocalized(), []);

  const onSequenceComplete = useCallback(() => {
    const endTime = dayjsLocalized();

    const userNewData: Partial<CBUserCustomData> = {};
    userNewData.trackedTime = makeUpdatedTrackedTime(
      beginTime,
      endTime,
      customData,
    );
    updateUser(user.uid, userNewData);
  }, [beginTime, customData, user.uid]);

  const requestStatus =
    // eslint-disable-next-line no-nested-ternary
    exerciseType === CBExerciseType.AIQuiz
      ? generatedAIQuizStatus
      : exerciseType === CBExerciseType.AIGeneratedQuestion
        ? generatedAIGeneratedQuestionStatus
        : generatedAIImageStatus;

  const errorMessage =
    // eslint-disable-next-line no-nested-ternary
    exerciseType === CBExerciseType.AIQuiz
      ? generatedAIQuizError?.message
      : exerciseType === CBExerciseType.AIGeneratedQuestion
        ? generatedAIGeneratedQuestionError?.message
        : generatedAIImageError?.message;

  return useMemo(
    () => (
      <CBFreePracticeExerciseSequence
        exercises={exercises}
        topic={topic}
        exerciseType={exerciseType || null}
        onMistake={onMistake}
        onCompleteExercise={onCompleteExercise}
        onSequenceComplete={onSequenceComplete}
        beginTime={beginTime}
        requestStatus={
          exerciseType === CBExerciseType.AIQuiz ||
          exerciseType === CBExerciseType.AIGeneratedQuestion ||
          exerciseType === CBExerciseType.LabelImage ||
          exerciseType === CBExerciseType.LabelImageVariation
            ? requestStatus
            : undefined
        }
        errorMessage={errorMessage}
      />
    ),
    [
      beginTime,
      errorMessage,
      exerciseType,
      exercises,
      onCompleteExercise,
      onMistake,
      onSequenceComplete,
      requestStatus,
      topic,
    ],
  );
}

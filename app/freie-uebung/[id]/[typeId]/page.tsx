"use client";

import { CBFreePracticeExerciseSequence } from "@/components/CBFreePracticeExerciseSequence/CBFreePracticeExerciseSequence";
import {
  CBExercise,
  CBExerciseWithMetaData,
} from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { familyTreeExercises } from "@/data/exercises/CBFamilyTreeExercise";
import { freeformQuestionExercises } from "@/data/exercises/CBFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/CBMatchingGameExercise";
import { quizExercises } from "@/data/exercises/CBQuizExercise";
import { swiperExercises } from "@/data/exercises/CBSwiperExercise";
import { CBTopic } from "@/data/topics";
import { makeUpdatedTrackedTime } from "@/firebase-client/makeUpdatedTrackedTime";
import { updateUser } from "@/firebase-client/updateUser";
import {
  CBMistakeExercise,
  CBUserCustomData,
} from "@/firebase-client/UserCustomDataConverter";
import { useUser } from "@/firebase-client/useUser";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
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
  [CBExerciseType.FreeformQuestion]: freeformQuestionExercises,
};

const exerciseAmountMap: Record<CBExerciseType, number> = {
  [CBExerciseType.Quiz]: 10,
  [CBExerciseType.AIQuiz]: 10,
  [CBExerciseType.FamilyTree]: 2,
  [CBExerciseType.MatchingGame]: 5,
  [CBExerciseType.Swiper]: 10,
  [CBExerciseType.FreeformQuestion]: 5,
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

  const { user, customData } = useUser();
  const { showSnackbar } = useSnackbar();
  const {
    data: generatedAIQuizData,
    status,
    error,
  } = useGenerateAIQuizQuery(
    topic,
    exerciseAmountMap[CBExerciseType.AIQuiz],
    exerciseType === CBExerciseType.AIQuiz,
  );

  const [exercises, setExercises] = useState<CBExerciseWithMetaData[]>([]);

  const isRetryingMistakes = params.typeId === retryMistakesPathSegment;

  useEffect(() => {
    let exercisesWithMetaData: CBExerciseWithMetaData[] = [];

    if (isRetryingMistakes) {
      customData.mistakeExercises
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
  ]);

  const onMistake = useCallback(
    (exercise: CBExerciseWithMetaData) => {
      const isNotAlreadyInMistakes =
        customData.mistakeExercises.find(
          (e) => e.id === exercise.id && e.topic === exercise.topic,
        ) === undefined;

      if (isNotAlreadyInMistakes) {
        const mistakeExercisesToAdd: (CBExercise | CBMistakeExercise)[] = [];
        if (exercise.type === CBExerciseType.AIQuiz) {
          const { isCompleted, ...exerciseWithoutMetadata } = exercise;
          mistakeExercisesToAdd.push(exerciseWithoutMetadata);
        } else {
          mistakeExercisesToAdd.push({
            id: exercise.id,
            topic: exercise.topic,
            type: exercise.type,
          });
        }

        const newUserData: Partial<CBUserCustomData> = {};
        newUserData.mistakeExercises = customData.mistakeExercises.concat(
          mistakeExercisesToAdd,
        );

        updateUser(user.uid, newUserData);
      }
    },
    [customData.mistakeExercises, user.uid],
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
        const exercise = customData.mistakeExercises.find(
          (e) => e.id === parameters.exerciseId,
        );

        if (exercise) {
          newUserData.mistakeExercises = customData.mistakeExercises.filter(
            (e) =>
              exercises.find((ex) => ex.id === e.id && ex.topic === e.topic) ===
              undefined,
          );
        }
      }
      updateUser(uid, newUserData);
    },
    [
      user,
      isRetryingMistakes,
      customData.solvedExercises,
      customData.points,
      customData.mistakeExercises,
      exercises,
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
          exerciseType === CBExerciseType.AIQuiz ? status : undefined
        }
        errorMessage={error?.message}
      />
    ),
    [
      beginTime,
      error?.message,
      exerciseType,
      exercises,
      onCompleteExercise,
      onMistake,
      onSequenceComplete,
      status,
      topic,
    ],
  );
}

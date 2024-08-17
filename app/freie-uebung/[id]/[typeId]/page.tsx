"use client";

import { CBTime } from "@/components/CBExerciseTimer/CBExerciseTimerInterfaces";
import { CBFreePracticeExerciseSequence } from "@/components/CBFreePracticeExerciseSequence/CBFreePracticeExerciseSequence";
import {
  CBExercise,
  CBExerciseWithMetaData,
} from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { familyTreeExercises } from "@/data/exercises/CBFamilyTreeExercise";
import { freeformQuestionExercises } from "@/data/exercises/CBFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/CBMatchingGameExercise";
import { quizExercises } from "@/data/exercises/CBQuizExercise";
import { swiperExercises } from "@/data/exercises/CBSwiperExercise";
import { pointsToAddForSequenceCompletion } from "@/data/gamification";
import { CBTopic } from "@/data/topics";
import { addExercisesToMistakes } from "@/firebase-client/addExercisesToMistakes";
import { addPointsToUser } from "@/firebase-client/addPointsToUser";
import { addSolvedExerciseToUser } from "@/firebase-client/addSolvedExerciseToUser";
import { removeExercisesFromMistakes } from "@/firebase-client/removeExercisesFromMistakes";
import { CBMistakeExercise } from "@/firebase-client/UserCustomDataConverter";
import { useUser } from "@/firebase-client/useUser";
import { CBAPIRequestState } from "@/helpers/CBAPIRequestState";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { getOpenAIQuizExercise } from "@/helpers/openai/getOpenAIGenerateQuizExercise";
import { retryMistakesPathSegment } from "@/helpers/routes";
import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
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
  [CBExerciseType.FamilyTree]: familyTreeExercises,
  [CBExerciseType.MatchingGame]: matchingGameExercises,
  [CBExerciseType.Swiper]: swiperExercises,
  [CBExerciseType.FreeformQuestion]: freeformQuestionExercises,
  [CBExerciseType.AIQuiz]: [],
};

const exerciseAmountMap: Record<CBExerciseType, number> = {
  [CBExerciseType.Quiz]: 10,
  [CBExerciseType.FamilyTree]: 2,
  [CBExerciseType.MatchingGame]: 5,
  [CBExerciseType.Swiper]: 10,
  [CBExerciseType.FreeformQuestion]: 5,
  [CBExerciseType.AIQuiz]: 1,
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

  const user = useUser();
  const { showSnackbar } = useCBExerciseSequenceSnackbar();

  const [exercises, setExercises] = useState<CBExerciseWithMetaData[]>([]);
  const [apiRequestState, setAPIRequestState] = useState<CBAPIRequestState>(
    CBAPIRequestState.Idle,
  );
  const [, setCompletionTime] = useState<CBTime>({
    sec: 0,
    min: 0,
  });

  const isRetryingMistakes = params.typeId === retryMistakesPathSegment;

  const exerciseType = getEnumValueByStringValue(CBExerciseType, params.typeId);

  useEffect(() => {
    let exercisesWithMetaData: CBExerciseWithMetaData[] = [];

    if (isRetryingMistakes) {
      user.customData.mistakeExercises
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
      // TODO: Always fetches twice because of strict mode. Just leave it like this?
      setAPIRequestState(CBAPIRequestState.Fetching);
      getOpenAIQuizExercise(user.user.uid, topic)
        .then((response) => {
          const exerciseWithMetaData: CBExerciseWithMetaData = {
            ...response,
            isCompleted: false,
          };

          setExercises([exerciseWithMetaData]);
          setAPIRequestState(CBAPIRequestState.Success);
        })
        .catch((error) => {
          setAPIRequestState(CBAPIRequestState.Error);
          showSnackbar(
            "Problem beim Generieren der Aufgabe",
            error.message,
            "error",
          );
        });
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
  }, [exerciseType, isRetryingMistakes, showSnackbar, topic]);

  const onMistake = useCallback(
    (exercise: CBExerciseWithMetaData) => {
      const isNotAlreadyInMistakes =
        user.customData.mistakeExercises.find(
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
        addExercisesToMistakes(user.user.uid, mistakeExercisesToAdd);
      }
    },
    [user.customData.mistakeExercises, user.user.uid],
  );

  const onCompleteExercise = useCallback(
    (parameters: { exerciseId: string; isCorrect: boolean }) => {
      const { uid } = user.user;

      addSolvedExerciseToUser(uid, 1);
      addPointsToUser(uid, 1);

      // If the exercise type is not set, the user is retrying mistakes
      if (isRetryingMistakes) {
        const exercise = user.customData.mistakeExercises.find(
          (e) => e.id === parameters.exerciseId,
        );

        if (exercise) {
          removeExercisesFromMistakes(uid, [exercise]);
        }
      }
    },
    [isRetryingMistakes, user.customData.mistakeExercises, user.user],
  );

  const onSequenceComplete = useCallback(
    (parameters: {
      allExercisesCompleted: boolean;
      difficulty: CBExerciseDifficulty;
    }) => {
      if (parameters.allExercisesCompleted && parameters.difficulty) {
        addPointsToUser(
          user.user.uid,
          pointsToAddForSequenceCompletion[parameters.difficulty],
        );
      }
    },
    [user.user.uid],
  );

  return useMemo(
    () => (
      <CBFreePracticeExerciseSequence
        exercises={exercises}
        topic={topic}
        exerciseType={exerciseType || null}
        onMistake={onMistake}
        onCompleteExercise={onCompleteExercise}
        onSequenceComplete={onSequenceComplete}
        setCompletionTime={setCompletionTime}
        apiRequestState={apiRequestState}
      />
    ),
    [
      apiRequestState,
      exerciseType,
      exercises,
      onCompleteExercise,
      onMistake,
      onSequenceComplete,
      topic,
    ],
  );
}

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
import { addExercisesToMistakes } from "@/firebase-client/addExercisesToMistakes";
import { addPointsToUser } from "@/firebase-client/addPointsToUser";
import { addSolvedExerciseToUser } from "@/firebase-client/addSolvedExerciseToUser";
import { addTrackedTimeToUser } from "@/firebase-client/addTrackedTimeToUser";
import { removeExercisesFromMistakes } from "@/firebase-client/removeExercisesFromMistakes";
import { CBMistakeExercise } from "@/firebase-client/UserCustomDataConverter";
import { useUser } from "@/firebase-client/useUser";
import { CBAPIRequestState } from "@/helpers/CBAPIRequestState";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { getOpenAIQuizExercise } from "@/helpers/openai/getOpenAIGenerateQuizExercise";
import { retryMistakesPathSegment } from "@/helpers/routes";
import { dayjsLocalized } from "@/helpers/time-tracking/dayjsLocalized";
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

  const { user, customData } = useUser();
  const { showSnackbar } = useCBExerciseSequenceSnackbar();

  const [exercises, setExercises] = useState<CBExerciseWithMetaData[]>([]);
  const [apiRequestState, setAPIRequestState] = useState<CBAPIRequestState>(
    CBAPIRequestState.Idle,
  );

  const isRetryingMistakes = params.typeId === retryMistakesPathSegment;

  const exerciseType = getEnumValueByStringValue(CBExerciseType, params.typeId);

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
      // TODO: Always fetches twice because of strict mode. Just leave it like this?
      setAPIRequestState(CBAPIRequestState.Fetching);
      getOpenAIQuizExercise(user.uid, topic)
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
        addExercisesToMistakes(user.uid, mistakeExercisesToAdd);
      }
    },
    [customData.mistakeExercises, user.uid],
  );

  const onCompleteExercise = useCallback(
    (parameters: { exerciseId: string; isCorrect: boolean }) => {
      const { uid } = user;

      // Todo: Combine these and only make one request
      addSolvedExerciseToUser(uid, 1);
      addPointsToUser(uid, 1);

      // If the exercise type is not set, the user is retrying mistakes
      if (isRetryingMistakes) {
        const exercise = customData.mistakeExercises.find(
          (e) => e.id === parameters.exerciseId,
        );

        if (exercise) {
          // Todo: See above, maybe you can combine this with the other requests as well?
          removeExercisesFromMistakes(uid, [exercise]);
        }
      }
    },
    [isRetryingMistakes, customData.mistakeExercises, user],
  );

  const beginTime = useMemo(() => dayjsLocalized(), []);

  const onSequenceComplete = useCallback(() => {
    const endTime = dayjsLocalized();
    addTrackedTimeToUser(user.uid, beginTime, endTime);
  }, [beginTime, user.uid]);

  return useMemo(
    () => (
      <CBFreePracticeExerciseSequence
        exercises={exercises}
        topic={topic}
        exerciseType={exerciseType || null}
        onMistake={onMistake}
        onCompleteExercise={onCompleteExercise}
        onSequenceComplete={onSequenceComplete}
        apiRequestState={apiRequestState}
        beginTime={beginTime}
      />
    ),
    [
      apiRequestState,
      beginTime,
      exerciseType,
      exercises,
      onCompleteExercise,
      onMistake,
      onSequenceComplete,
      topic,
    ],
  );
}

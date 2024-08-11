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
import { CBMistakeExercise } from "@/firebase/client/UserCustomDataConverter";
import { addExercisesToMistakes } from "@/firebase/client/addExercisesToMistakes";
import { addPointsToUser } from "@/firebase/client/addPointsToUser";
import { addSolvedExerciseToUser } from "@/firebase/client/addSolvedExerciseToUser";
import { removeExercisesFromMistakes } from "@/firebase/client/removeExercisesFromMistakes";
import { useUser } from "@/firebase/client/useUser";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { retryMistakesPathSegment } from "@/helpers/routes";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
};

const exerciseAmountMap: Record<CBExerciseType, number> = {
  [CBExerciseType.Quiz]: 10,
  [CBExerciseType.FamilyTree]: 2,
  [CBExerciseType.MatchingGame]: 5,
  [CBExerciseType.Swiper]: 10,
  [CBExerciseType.FreeformQuestion]: 5,
};

export default function FreePracticeSequencePage({
  params,
}: FreePracticeSequenceParams) {
  const user = useUser();

  const [originalExercises, setOriginalExercises] = useState<
    CBExerciseWithMetaData[]
  >([]);
  const [isFirstRender, setFirstRender] = useState<boolean>(true);

  const topic = getEnumValueByStringValue(CBTopic, params.id);

  if (!topic) {
    notFound();
  }

  const exerciseType =
    params.typeId === retryMistakesPathSegment
      ? null
      : (params.typeId as CBExerciseType);

  const [, setCompletionTime] = useState<CBTime>({
    sec: 0,
    min: 0,
  });

  useEffect(() => {
    let exercises: CBExerciseWithMetaData[] = [];

    if (exerciseType) {
      if (isFirstRender) {
        setFirstRender(false);

        exercises = exercisesMap[exerciseType]
          .filter((e) => e.topic === topic)
          .map((ex) => ({ ...ex, isCompleted: false }));

        const desiredAmountOfExercises = exerciseAmountMap[exerciseType];

        const amountOfExercises =
          exercises.length < desiredAmountOfExercises
            ? exercises.length
            : desiredAmountOfExercises;
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

        setOriginalExercises(randomExercises);
      }
    } else if (isFirstRender) {
      setFirstRender(false);

      user?.customData.mistakeExercises.forEach((e) => {
        if (e.topic === topic) {
          const exercise = exercisesMap[e.type].find((ex) => ex.id === e.id);

          if (exercise) {
            const exerciseWithMetaData: CBExerciseWithMetaData = {
              ...exercise,
              isCompleted: false,
            };
            exercises.push(exerciseWithMetaData);
          }
        }
      });

      const amountOfExercises = exercises.length < 5 ? exercises.length : 5;
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

      setOriginalExercises(randomExercises);
    }
  }, [exerciseType, isFirstRender, topic, user?.customData.mistakeExercises]);

  const onMistake = useCallback(
    (exercise: CBMistakeExercise) => {
      const isNotAlreadyInMistakes =
        user?.customData.mistakeExercises.find(
          (e) => e.id === exercise.id && e.topic === exercise.topic,
        ) === undefined;

      if (user?.user && isNotAlreadyInMistakes) {
        const mistakeExercisesToAdd = [exercise];
        addExercisesToMistakes(user.user.uid, mistakeExercisesToAdd);
      }
    },
    [user],
  );

  const onCompleteExercise = useCallback(
    (parameters: { exerciseId: string; isCorrect: boolean }) => {
      if (user?.user) {
        const solvedExercisesToAdd = 1;
        addSolvedExerciseToUser(user.user.uid, solvedExercisesToAdd);
        const pointsToAdd = 1;
        addPointsToUser(user.user.uid, pointsToAdd);

        // If the exercise type is not set, the user is retrying mistakes
        if (!exerciseType) {
          const exercise = user.customData.mistakeExercises.find(
            (e) => e.id === parameters.exerciseId,
          );

          if (exercise) {
            removeExercisesFromMistakes(user.user.uid, [exercise]);
          }
        }
      }
    },
    [exerciseType, user],
  );

  const onSequenceComplete = useCallback(
    (parameters: {
      allExercisesCompleted: boolean;
      difficulty: CBExerciseDifficulty;
    }) => {
      if (user?.user) {
        if (parameters.allExercisesCompleted && parameters.difficulty) {
          addPointsToUser(
            user.user.uid,
            pointsToAddForSequenceCompletion[parameters.difficulty],
          );
        }
      }
    },
    [user],
  );

  return (
    <CBFreePracticeExerciseSequence
      exercises={originalExercises}
      topic={topic}
      exerciseType={exerciseType}
      onMistake={onMistake}
      onCompleteExercise={onCompleteExercise}
      onSequenceComplete={onSequenceComplete}
      setCompletionTime={setCompletionTime}
    />
  );
}

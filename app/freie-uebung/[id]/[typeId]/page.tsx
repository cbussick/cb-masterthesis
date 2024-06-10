"use client";

import { MPMITime } from "@/components/MPMIExerciseTimer/MPMIExerciseTimerInterfaces";
import { MPMIFreePracticeExerciseSequence } from "@/components/MPMIFreePracticeExerciseSequence/MPMIFreePracticeExerciseSequence";
import {
  MPMIExercise,
  MPMIExerciseWithMetaData,
} from "@/data/exercises/MPMIExercise";
import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { MPMIExerciseType } from "@/data/exercises/MPMIExerciseType";
import { familyTreeExercises } from "@/data/exercises/MPMIFamilyTreeExercise";
import { freeformQuestionExercises } from "@/data/exercises/MPMIFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/MPMIMatchingGameExercise";
import { quizExercises } from "@/data/exercises/MPMIQuizExercise";
import { swiperExercises } from "@/data/exercises/MPMISwiperExercise";
import { pointsToAddForSequenceCompletion } from "@/data/gamification";
import { MPMITopic } from "@/data/topics";
import { MPMIMistakeExercise } from "@/firebase/UserCustomDataConverter";
import { addExercisesToMistakes } from "@/firebase/addExercisesToMistakes";
import { addPointsToUser } from "@/firebase/addPointsToUser";
import { addSolvedExerciseToUser } from "@/firebase/addSolvedExerciseToUser";
import { removeExercisesFromMistakes } from "@/firebase/removeExercisesFromMistakes";
import { useUser } from "@/firebase/useUser";
import { retryMistakesPathSegment } from "@/helpers/routes";
import { useCallback, useEffect, useState } from "react";

interface FreePracticeSequenceParams {
  params: {
    id: string;
    typeId: string;
  };
}

const exercisesMap: Record<MPMIExerciseType, MPMIExercise[]> = {
  [MPMIExerciseType.Quiz]: quizExercises,
  [MPMIExerciseType.FamilyTree]: familyTreeExercises,
  [MPMIExerciseType.MatchingGame]: matchingGameExercises,
  [MPMIExerciseType.Swiper]: swiperExercises,
  [MPMIExerciseType.FreeformQuestion]: freeformQuestionExercises,
};

const exerciseAmountMap: Record<MPMIExerciseType, number> = {
  [MPMIExerciseType.Quiz]: 10,
  [MPMIExerciseType.FamilyTree]: 2,
  [MPMIExerciseType.MatchingGame]: 5,
  [MPMIExerciseType.Swiper]: 10,
  [MPMIExerciseType.FreeformQuestion]: 5,
};

export default function FreePracticeSequencePage({
  params,
}: FreePracticeSequenceParams) {
  const user = useUser();

  const [originalExercises, setOriginalExercises] = useState<
    MPMIExerciseWithMetaData[]
  >([]);

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const topic = params.id as MPMITopic;
  const exerciseType =
    params.typeId === retryMistakesPathSegment
      ? null
      : (params.typeId as MPMIExerciseType);

  const [, setCompletionTime] = useState<MPMITime>({
    sec: 0,
    min: 0,
  });

  useEffect(() => {
    let exercises: MPMIExerciseWithMetaData[] = [];

    if (exerciseType) {
      if (isFirstRender) {
        setIsFirstRender(false);

        exercises = exercisesMap[exerciseType]
          .filter((e) => e.topic === topic)
          .map((ex) => ({ ...ex, isCompleted: false }));

        const desiredAmountOfExercises = exerciseAmountMap[exerciseType];

        const amountOfExercises =
          exercises.length < desiredAmountOfExercises
            ? exercises.length
            : desiredAmountOfExercises;
        const randomExercises = [];
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
      setIsFirstRender(false);

      user?.customData.mistakeExercises.forEach((e) => {
        if (e.topic === topic) {
          const exercise = exercisesMap[e.type].find((ex) => ex.id === e.id);

          if (exercise) {
            const exerciseWithMetaData: MPMIExerciseWithMetaData = {
              ...exercise,
              isCompleted: false,
            };
            exercises.push(exerciseWithMetaData);
          }
        }
      });

      const amountOfExercises = exercises.length < 5 ? exercises.length : 5;
      const randomExercises = [];
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
    (exercise: MPMIMistakeExercise) => {
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
      difficulty: MPMIExerciseDifficulty;
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
    <MPMIFreePracticeExerciseSequence
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

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
import { CBMistakeExercise } from "@/firebase-client/UserCustomDataConverter";
import { addExercisesToMistakes } from "@/firebase-client/addExercisesToMistakes";
import { addPointsToUser } from "@/firebase-client/addPointsToUser";
import { addSolvedExerciseToUser } from "@/firebase-client/addSolvedExerciseToUser";
import { removeExercisesFromMistakes } from "@/firebase-client/removeExercisesFromMistakes";
import { useUser } from "@/firebase-client/useUser";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { getOpenAIQuizExercise } from "@/helpers/openai/getOpenAIGenerateQuizExercise";
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
  const user = useUser();

  const topic = getEnumValueByStringValue(CBTopic, params.id);

  if (!topic) {
    notFound();
  }

  const [exercises, setExercises] = useState<CBExerciseWithMetaData[]>([]);
  const [isFirstRender, setFirstRender] = useState<boolean>(true);
  const [, setCompletionTime] = useState<CBTime>({
    sec: 0,
    min: 0,
  });

  const exerciseType =
    params.typeId === retryMistakesPathSegment
      ? null
      : (params.typeId as CBExerciseType);

  useEffect(() => {
    let exercisesWithMetaData: CBExerciseWithMetaData[] = [];

    if (exerciseType) {
      if (isFirstRender) {
        setFirstRender(false);

        if (exerciseType === CBExerciseType.AIQuiz) {
          getOpenAIQuizExercise(user.user.uid, topic).then((response) => {
            const exerciseWithMetaData: CBExerciseWithMetaData = {
              ...response,
              isCompleted: false,
            };

            setExercises([exerciseWithMetaData]);
          });
        } else {
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
      }
    } else if (isFirstRender) {
      // The user is retrying mistakes

      setFirstRender(false);

      user.customData.mistakeExercises
        .filter((e) => e.topic === topic)
        .forEach((e) => {
          const exercise = exercisesMap[e.type].find((ex) => ex.id === e.id);

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
    }
  }, [exerciseType, isFirstRender, topic, user]);

  const onMistake = useCallback(
    (exercise: CBMistakeExercise) => {
      const isNotAlreadyInMistakes =
        user.customData.mistakeExercises.find(
          (e) => e.id === exercise.id && e.topic === exercise.topic,
        ) === undefined;

      if (isNotAlreadyInMistakes) {
        const mistakeExercisesToAdd = [exercise];
        addExercisesToMistakes(user.user.uid, mistakeExercisesToAdd);
      }
    },
    [user],
  );

  const onCompleteExercise = useCallback(
    (parameters: { exerciseId: string; isCorrect: boolean }) => {
      const { uid } = user.user;

      const solvedExercisesToAdd = 1;
      addSolvedExerciseToUser(uid, solvedExercisesToAdd);
      const pointsToAdd = 1;
      addPointsToUser(uid, pointsToAdd);

      // If the exercise type is not set, the user is retrying mistakes
      if (!exerciseType) {
        const exercise = user.customData.mistakeExercises.find(
          (e) => e.id === parameters.exerciseId,
        );

        if (exercise) {
          removeExercisesFromMistakes(uid, [exercise]);
        }
      }
    },
    [exerciseType, user.customData.mistakeExercises, user.user],
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
    [user],
  );

  return (
    <CBFreePracticeExerciseSequence
      exercises={exercises}
      topic={topic}
      exerciseType={exerciseType}
      onMistake={onMistake}
      onCompleteExercise={onCompleteExercise}
      onSequenceComplete={onSequenceComplete}
      setCompletionTime={setCompletionTime}
    />
  );
}

"use client";

import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBFamilyTreeExercise } from "@/data/exercises/CBFamilyTreeExercise";
import { CBFreeformQuestionExercise } from "@/data/exercises/CBFreeformQuestionExercise";
import { CBMatchingGameExercise } from "@/data/exercises/CBMatchingGameExercise";
import { CBQuizExercise } from "@/data/exercises/CBQuizExercise";
import { CBSwiperExercise } from "@/data/exercises/CBSwiperExercise";
import { getInformationForExercise } from "@/helpers/getInformationForExercise";
import { Stack } from "@mui/material";
import { useRef } from "react";
import { CBFamilyTreeWithProviders } from "../exercises/CBFamilyTree/CBFamilyTreeWithProviders/CBFamilyTreeWithProviders";
import { CBFreeformQuestion } from "../exercises/CBFreeformQuestion/CBFreeformQuestion";
import { CBMatchingGame } from "../exercises/CBMatchingGame/CBMatchingGame";
import { CBQuiz } from "../exercises/CBQuiz/CBQuiz";
import { CBSwiper } from "../exercises/CBSwiper/CBSwiper";
import { CBExerciseSequenceBottomBar } from "./CBExerciseSequenceBottomBar/CBExerciseSequenceBottomBar";
import { CBExerciseSequenceEndScreen } from "./CBExerciseSequenceEndScreen/CBExerciseSequenceEndScreen";
import { CBExerciseSequenceProps } from "./CBExerciseSequenceInterfaces";
import { CBExerciseSequenceTopBar } from "./CBExerciseSequenceTopBar/CBExerciseSequenceTopBar";

export const CBExerciseSequence = ({
  type,
  originalExercises,
  currentExerciseIndex,
  onMistake,
  onCompleteHref,
  onCompleteExercise,
  onSequenceComplete,
  setCompletionTime,
  difficulty,
  onCancel,
}: CBExerciseSequenceProps): JSX.Element | null => {
  const componentRef = useRef();
  const timerRef = useRef();

  if (originalExercises.length === 0) {
    return null;
  }

  const uncompletedExercises = originalExercises.filter(
    (exercise) => !exercise.isCompleted,
  );

  const completedExercises = originalExercises.filter(
    (exercise) => exercise.isCompleted,
  );

  const currentExercise =
    currentExerciseIndex < uncompletedExercises.length
      ? uncompletedExercises[currentExerciseIndex]
      : undefined;

  const exerciseInformationToRender =
    getInformationForExercise(currentExercise);

  let componentToRender: JSX.Element | null = null;
  if (currentExercise?.type === CBExerciseType.FamilyTree) {
    const castExercise = currentExercise as CBFamilyTreeExercise;

    componentToRender = (
      <CBFamilyTreeWithProviders
        // Keys are necessary to re-render the component when the exercise changes
        key={castExercise.id}
        exercise={castExercise}
        sequenceType={type}
        componentRef={componentRef}
      />
    );
  } else if (currentExercise?.type === CBExerciseType.MatchingGame) {
    const castExercise = currentExercise as CBMatchingGameExercise;

    componentToRender = (
      <CBMatchingGame
        key={castExercise.id}
        exercise={castExercise}
        sequenceType={type}
        ref={componentRef}
      />
    );
  } else if (currentExercise?.type === CBExerciseType.Quiz) {
    const castExercise = currentExercise as unknown as CBQuizExercise;

    componentToRender = (
      <CBQuiz
        key={castExercise.id}
        exercise={castExercise}
        onMistake={onMistake}
        onCompleteExercise={onCompleteExercise}
      />
    );
  } else if (currentExercise?.type === CBExerciseType.Swiper) {
    const castExercise = currentExercise as CBSwiperExercise;

    componentToRender = (
      <CBSwiper
        key={castExercise.id}
        exercise={castExercise}
        onMistake={onMistake}
        onCompleteExercise={onCompleteExercise}
        difficulty={difficulty}
      />
    );
  } else if (currentExercise?.type === CBExerciseType.FreeformQuestion) {
    const castExercise = currentExercise as CBFreeformQuestionExercise;

    componentToRender = (
      <CBFreeformQuestion
        key={castExercise.id}
        exercise={castExercise}
        onCompleteExercise={onCompleteExercise}
        onMistake={onMistake}
      />
    );
  }

  const sessionIsFinished =
    currentExerciseIndex > uncompletedExercises.length - 1;

  return (
    <Stack sx={{ minHeight: 0 }} spacing={3} flexGrow={1}>
      <CBExerciseSequenceTopBar
        title={exerciseInformationToRender?.title || ""}
        currentExerciseIndex={currentExerciseIndex}
        completedExercisesAmount={completedExercises.length}
        totalExercisesAmount={originalExercises.length}
        type={type}
        sessionIsFinished={sessionIsFinished}
        setCompletionTime={setCompletionTime}
        ref={timerRef}
      />

      <Stack
        sx={{ minHeight: 0 }}
        flex="1 1 auto"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack
          flex="1 1 auto"
          justifyContent="center"
          sx={{ minHeight: 0 }}
          overflow="auto"
        >
          {sessionIsFinished ? (
            <CBExerciseSequenceEndScreen
              difficulty={difficulty}
              type={type}
              onCompleteHref={onCompleteHref}
            />
          ) : (
            componentToRender
          )}
        </Stack>

        <CBExerciseSequenceBottomBar
          sequenceType={type}
          uncompletedExercises={uncompletedExercises}
          onMistake={onMistake}
          onCompleteExercise={onCompleteExercise}
          onSequenceComplete={onSequenceComplete}
          difficulty={difficulty}
          onCompleteHref={onCompleteHref}
          onCancel={onCancel}
          componentRef={componentRef}
          timerRef={timerRef}
        />
      </Stack>
    </Stack>
  );
};

"use client";

import { MPMIExerciseType } from "@/data/exercises/MPMIExerciseType";
import { MPMIFamilyTreeExercise } from "@/data/exercises/MPMIFamilyTreeExercise";
import { MPMIFreeformQuestionExercise } from "@/data/exercises/MPMIFreeformQuestionExercise";
import { MPMIMatchingGameExercise } from "@/data/exercises/MPMIMatchingGameExercise";
import { MPMIQuizExercise } from "@/data/exercises/MPMIQuizExercise";
import { MPMISwiperExercise } from "@/data/exercises/MPMISwiperExercise";
import { getInformationForExercise } from "@/helpers/getInformationForExercise";
import { Stack } from "@mui/material";
import { useRef } from "react";
import { MPMIFamilyTreeWithProviders } from "../exercises/MPMIFamilyTree/MPMIFamilyTreeWithProviders/MPMIFamilyTreeWithProviders";
import { MPMIFreeformQuestion } from "../exercises/MPMIFreeformQuestion/MPMIFreeformQuestion";
import { MPMIMatchingGame } from "../exercises/MPMIMatchingGame/MPMIMatchingGame";
import { MPMIQuiz } from "../exercises/MPMIQuiz/MPMIQuiz";
import { MPMISwiper } from "../exercises/MPMISwiper/MPMISwiper";
import { MPMIExerciseSequenceBottomBar } from "./MPMIExerciseSequenceBottomBar/MPMIExerciseSequenceBottomBar";
import { MPMIExerciseSequenceEndScreen } from "./MPMIExerciseSequenceEndScreen/MPMIExerciseSequenceEndScreen";
import { MPMIExerciseSequenceProps } from "./MPMIExerciseSequenceInterfaces";
import { MPMIExerciseSequenceTopBar } from "./MPMIExerciseSequenceTopBar/MPMIExerciseSequenceTopBar";

export const MPMIExerciseSequence = ({
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
}: MPMIExerciseSequenceProps): JSX.Element | null => {
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
  if (currentExercise?.type === MPMIExerciseType.FamilyTree) {
    const castExercise = currentExercise as MPMIFamilyTreeExercise;

    componentToRender = (
      <MPMIFamilyTreeWithProviders
        // Keys are necessary to re-render the component when the exercise changes
        key={castExercise.id}
        exercise={castExercise}
        sequenceType={type}
        componentRef={componentRef}
      />
    );
  } else if (currentExercise?.type === MPMIExerciseType.MatchingGame) {
    const castExercise = currentExercise as MPMIMatchingGameExercise;

    componentToRender = (
      <MPMIMatchingGame
        key={castExercise.id}
        exercise={castExercise}
        sequenceType={type}
        ref={componentRef}
      />
    );
  } else if (currentExercise?.type === MPMIExerciseType.Quiz) {
    const castExercise = currentExercise as unknown as MPMIQuizExercise;

    componentToRender = (
      <MPMIQuiz
        key={castExercise.id}
        exercise={castExercise}
        onMistake={onMistake}
        onCompleteExercise={onCompleteExercise}
      />
    );
  } else if (currentExercise?.type === MPMIExerciseType.Swiper) {
    const castExercise = currentExercise as MPMISwiperExercise;

    componentToRender = (
      <MPMISwiper
        key={castExercise.id}
        exercise={castExercise}
        onMistake={onMistake}
        onCompleteExercise={onCompleteExercise}
        difficulty={difficulty}
      />
    );
  } else if (currentExercise?.type === MPMIExerciseType.FreeformQuestion) {
    const castExercise = currentExercise as MPMIFreeformQuestionExercise;

    componentToRender = (
      <MPMIFreeformQuestion
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
      <MPMIExerciseSequenceTopBar
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
            <MPMIExerciseSequenceEndScreen
              difficulty={difficulty}
              type={type}
              onCompleteHref={onCompleteHref}
            />
          ) : (
            componentToRender
          )}
        </Stack>

        <MPMIExerciseSequenceBottomBar
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

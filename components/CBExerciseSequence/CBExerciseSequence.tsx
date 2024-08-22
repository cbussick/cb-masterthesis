"use client";

import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBFamilyTreeExerciseWithMetaData } from "@/data/exercises/CBFamilyTreeExercise";
import { CBFreeformQuestionExerciseWithMetaData } from "@/data/exercises/CBFreeformQuestionExercise";
import { CBMatchingGameExerciseWithMetaData } from "@/data/exercises/CBMatchingGameExercise";
import { CBQuizExerciseWithMetaData } from "@/data/exercises/CBQuizExercise";
import { CBSwiperExerciseWithMetaData } from "@/data/exercises/CBSwiperExercise";
import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
import { Stack } from "@mui/material";
import { useRef } from "react";
import { CBSnackbar } from "../CBSnackbar/CBSnackbar";
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
  originalExercises,
  currentExerciseIndex,
  onMistake,
  onCompleteHref,
  onCompleteExercise,
  onSequenceComplete,
  difficulty,
  onCancel,
}: CBExerciseSequenceProps): JSX.Element | null => {
  const { isOpen, setOpen, title, message, severity } =
    useCBExerciseSequenceSnackbar();

  const componentRef = useRef();

  if (originalExercises.length === 0) {
    return null;
  }

  const [completedExercises, uncompletedExercises] = originalExercises.reduce(
    (acc, exercise) => {
      if (exercise.isCompleted) {
        acc[0].push(exercise);
      } else {
        acc[1].push(exercise);
      }
      return acc;
    },
    [[], []] as [CBExerciseWithMetaData[], CBExerciseWithMetaData[]],
  );

  const currentExercise =
    currentExerciseIndex < uncompletedExercises.length
      ? uncompletedExercises[currentExerciseIndex]
      : undefined;

  const isSequenceFinished =
    currentExerciseIndex > uncompletedExercises.length - 1;

  const componentInformationMap: Record<
    CBExerciseType,
    (exercise: CBExerciseWithMetaData) => {
      title: string;
      component: JSX.Element;
    }
  > = {
    [CBExerciseType.Quiz]: (exercise) => {
      const castExercise = exercise as CBQuizExerciseWithMetaData;
      return {
        title: castExercise.question,
        component: (
          <CBQuiz
            key={castExercise.id}
            exercise={castExercise}
            onMistake={onMistake}
            onCompleteExercise={onCompleteExercise}
          />
        ),
      };
    },
    [CBExerciseType.FamilyTree]: (exercise) => {
      const castExercise = exercise as CBFamilyTreeExerciseWithMetaData;
      return {
        title: castExercise.description,
        component: (
          <CBFamilyTreeWithProviders
            // Keys are necessary to re-render the component when the exercise changes
            key={castExercise.id}
            exercise={castExercise}
            onMistake={onMistake}
            onCompleteExercise={onCompleteExercise}
            componentRef={componentRef}
          />
        ),
      };
    },
    [CBExerciseType.MatchingGame]: (exercise) => {
      const castExercise = exercise as CBMatchingGameExerciseWithMetaData;
      return {
        title: castExercise.title,
        component: (
          <CBMatchingGame
            key={castExercise.id}
            exercise={castExercise}
            onMistake={onMistake}
            onCompleteExercise={onCompleteExercise}
            ref={componentRef}
          />
        ),
      };
    },
    [CBExerciseType.Swiper]: (exercise) => {
      const castExercise = exercise as CBSwiperExerciseWithMetaData;

      return {
        title: "Ordne die Zellorganellen den richtigen Zelltypen zu.",
        component: (
          <CBSwiper
            key={castExercise.id}
            exercise={castExercise}
            onMistake={onMistake}
            onCompleteExercise={onCompleteExercise}
            difficulty={difficulty}
          />
        ),
      };
    },
    [CBExerciseType.FreeformQuestion]: (exercise) => {
      const castExercise = exercise as CBFreeformQuestionExerciseWithMetaData;
      return {
        title: castExercise.question,
        component: (
          <CBFreeformQuestion
            key={castExercise.id}
            exercise={castExercise}
            onCompleteExercise={onCompleteExercise}
            onMistake={onMistake}
          />
        ),
      };
    },
    [CBExerciseType.AIQuiz]: (exercise) => {
      const castExercise = exercise as CBQuizExerciseWithMetaData;
      return {
        title: castExercise.question,
        component: (
          <CBQuiz
            key={castExercise.id}
            exercise={castExercise}
            onMistake={onMistake}
            onCompleteExercise={onCompleteExercise}
          />
        ),
      };
    },
  };

  const componentInformation =
    currentExercise?.type &&
    componentInformationMap[currentExercise?.type](currentExercise);

  return (
    <>
      <Stack spacing={3} sx={{ minHeight: 0, flexGrow: 1 }}>
        <CBExerciseSequenceTopBar
          title={componentInformation?.title || ""}
          currentExerciseIndex={currentExerciseIndex}
          completedExercisesAmount={completedExercises.length}
          totalExercisesAmount={originalExercises.length}
          isSequenceFinished={isSequenceFinished}
        />

        <Stack
          spacing={3}
          sx={{
            minHeight: 0,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Stack
            sx={{
              minHeight: 0,
              flex: 1,
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            {isSequenceFinished ? (
              <CBExerciseSequenceEndScreen
                difficulty={difficulty}
                onCompleteHref={onCompleteHref}
              />
            ) : (
              componentInformation?.component
            )}
          </Stack>

          {!isSequenceFinished && (
            <CBExerciseSequenceBottomBar
              uncompletedExercises={uncompletedExercises}
              onMistake={onMistake}
              onCompleteExercise={onCompleteExercise}
              onSequenceComplete={onSequenceComplete}
              onCompleteHref={onCompleteHref}
              onCancel={onCancel}
              componentRef={componentRef}
            />
          )}
        </Stack>
      </Stack>

      <CBSnackbar
        isOpen={isOpen}
        severity={severity}
        onClose={() => {
          setOpen(false);
        }}
        title={title}
        message={message}
        autoHideDuration={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ position: "absolute" }}
      />
    </>
  );
};

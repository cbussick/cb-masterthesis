"use client";

import { CBDinaHint } from "@/components/CBDinaHint/CBDinaHint";
import { CBUnstyledNextLink } from "@/components/CBUnstyledNextLink/CBUnstyledNextLink";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { useUser } from "@/firebase-client/useUser";
import { getOpenAIDiNAsHintForQuestion } from "@/helpers/openai/getOpenAIDiNAsHintForQuestion";
import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
import { useConfetti } from "@/ui/useConfetti";
import {
  CheckRounded,
  ChevronRightRounded,
  MeetingRoomRounded,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { CBExerciseSequenceType } from "../CBExerciseSequenceWrapperInterfaces";
import { useCBExerciseSequence } from "../useCBExerciseSequenceProvider";
import { CBConfirmation } from "./CBConfirmation";
import { CBExerciseSequenceBottomBarProps } from "./CBExerciseSequenceBottomBarInterfaces";

const exerciseTypesWithConfirmButton = [
  CBExerciseType.FamilyTree,
  CBExerciseType.MatchingGame,
];

const cancelButtonLabelMap: Record<CBExerciseSequenceType, string> = {
  [CBExerciseSequenceType.ExamSimulator]: "Prüfung abbrechen",
  [CBExerciseSequenceType.FreePractice]: "Übung beenden",
  [CBExerciseSequenceType.TopicWorld]: "Einheit beenden",
  [CBExerciseSequenceType.RetryMistakes]: "Fehlerwiederholung beenden",
};

export const CBExerciseSequenceBottomBar = ({
  sequenceType,
  uncompletedExercises,
  onMistake,
  onCompleteExercise,
  onSequenceComplete,
  difficulty,
  onCompleteHref,
  onCancel,
  componentRef,
  timerRef,
}: CBExerciseSequenceBottomBarProps): JSX.Element | null => {
  const user = useUser();
  const { startConfetti } = useConfetti();
  const { showSnackbar, setOpen } = useCBExerciseSequenceSnackbar();
  const {
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
    currentExerciseIndex,
    setCurrentExerciseIndex,
    exercises,
    setExercises,
  } = useCBExerciseSequence();

  const [isFetchingHint, setFetchingHint] = useState<boolean>(false);
  const [isErrorFetchingHint, setErrorFetchingHint] = useState<boolean>(false);
  const [hint, setHint] = useState<string>("");

  const currentExercise = uncompletedExercises[currentExerciseIndex];

  const currentExerciseType = currentExercise?.type;

  const allExercisesCompleted = exercises.every(
    (exercise) => exercise.isCompleted,
  );

  const moveToNextExercise = () => {
    if (currentExerciseIndex === uncompletedExercises.length - 1) {
      // The last exercise was completed. The whole sequence is completed.
      if (onSequenceComplete) {
        if (sequenceType === CBExerciseSequenceType.ExamSimulator) {
          onSequenceComplete();
        } else {
          onSequenceComplete({ allExercisesCompleted, difficulty });
        }
        if (timerRef.current?.onSequenceComplete) {
          timerRef.current.onSequenceComplete();
        }
      }

      if (exercises.every((exercise) => exercise.isCompleted)) {
        startConfetti();
      }
    }

    setCurrentExerciseIndex((prev) => prev + 1);
  };

  const onClickNext = () => {
    moveToNextExercise();
    setCurrentExerciseFinished(false);
    setHint("");
    setOpen(false);
  };

  const onClickConfirm = () => {
    /**
     * Not ideal, but works for now.
     * Make sure to have the following code inside each child exercise component which is
     * evaluated by pushing the "Auswerten"-button:
     * ```
     * useImperativeHandle(ref, () => ({
     *     onConfirm,
     * }));
     * ```
     *
     * And use an appropriate `onConfirm` function. See `CBFamilyTree` for example.
     */
    // @ts-ignore
    if (componentRef.current?.onConfirm) {
      const exerciseConfirmationData =
        componentRef.current.onConfirm() as CBConfirmation;

      if (exerciseTypesWithConfirmButton.includes(currentExerciseType)) {
        setCurrentExerciseFinished(exerciseConfirmationData.isFinished);

        if (exerciseConfirmationData.isFinished) {
          if (!exerciseConfirmationData.isCorrect && onMistake) {
            onMistake({
              id: currentExercise.id,
              topic: currentExercise.topic,
              type: currentExercise.type,
            });
          }

          if (
            exerciseConfirmationData.isCorrect &&
            user &&
            currentExerciseIndex !== undefined
          ) {
            onCompleteExercise({
              exerciseId: uncompletedExercises[currentExerciseIndex].id,
              isCorrect: exerciseConfirmationData.isCorrect,
            });

            setExercises((previousExercises) => {
              const newExercises = previousExercises.map((ex) => {
                if (ex.id === currentExercise?.id) {
                  return {
                    ...ex,
                    isCompleted: true,
                  };
                }
                return ex;
              });

              return newExercises;
            });
          }
        }
      }
    }
  };

  const cancelButton: JSX.Element = (
    <Button
      onClick={
        onCancel
          ? () => {
              onCancel();
              setOpen(false);
            }
          : undefined
      }
      variant="outlined"
      startIcon={<MeetingRoomRounded />}
    >
      {cancelButtonLabelMap[sequenceType]}
    </Button>
  );

  const onClickHint = () => {
    if ("question" in currentExercise) {
      setFetchingHint(true);
      getOpenAIDiNAsHintForQuestion(currentExercise.question)
        .then((response) => {
          setFetchingHint(false);
          setHint(response.hint);
        })
        .catch((error) => {
          setFetchingHint(false);
          setErrorFetchingHint(true);
          showSnackbar(
            "Problem beim Erfragen eines Tipps",
            error.message,
            "error",
          );
        });
    } else {
      setHint(currentExercise.hint);
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
      }}
    >
      {onCompleteHref ? (
        <CBUnstyledNextLink href={onCompleteHref}>
          {cancelButton}
        </CBUnstyledNextLink>
      ) : (
        cancelButton
      )}

      <Stack direction="row" spacing={2}>
        {sequenceType !== CBExerciseSequenceType.ExamSimulator && (
          <CBDinaHint
            onClick={onClickHint}
            hint={hint}
            isLoading={isFetchingHint}
            disabled={
              isFetchingHint || isErrorFetchingHint || isCurrentExerciseFinished
            }
          />
        )}

        {exerciseTypesWithConfirmButton.includes(currentExerciseType) && (
          <Button
            onClick={onClickConfirm}
            disabled={isCurrentExerciseFinished}
            endIcon={<CheckRounded />}
          >
            Auswerten
          </Button>
        )}

        <Button
          onClick={onClickNext}
          disabled={!isCurrentExerciseFinished}
          endIcon={<ChevronRightRounded />}
        >
          Weiter
        </Button>
      </Stack>
    </Stack>
  );
};

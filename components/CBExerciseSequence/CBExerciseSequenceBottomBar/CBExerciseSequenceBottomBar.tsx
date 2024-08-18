"use client";

import { CBDinaHint } from "@/components/CBDinaHint/CBDinaHint";
import { CBUnstyledNextLink } from "@/components/CBUnstyledNextLink/CBUnstyledNextLink";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBAPIRequestState } from "@/helpers/CBAPIRequestState";
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
  uncompletedExercises,
  onSequenceComplete,
  onCompleteHref,
  onCancel,
  componentRef,
}: CBExerciseSequenceBottomBarProps): JSX.Element => {
  const { startConfetti } = useConfetti();
  const { showSnackbar, setOpen: setSnackbarOpen } =
    useCBExerciseSequenceSnackbar();
  const {
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
    currentExerciseIndex,
    setCurrentExerciseIndex,
    exercises,
    type,
  } = useCBExerciseSequence();

  const [hintAPIRequestState, setHintAPIRequestState] =
    useState<CBAPIRequestState>(CBAPIRequestState.Idle);
  const [hint, setHint] = useState<string>("");

  const currentExercise = uncompletedExercises[currentExerciseIndex];
  const currentExerciseType = currentExercise?.type;
  const allExercisesCompleted = exercises.every(
    (exercise) => exercise.isCompleted,
  );

  const onClickNext = () => {
    if (currentExerciseIndex === uncompletedExercises.length - 1) {
      // The last exercise was finished. The whole sequence is completed.
      if (onSequenceComplete) {
        if (type === CBExerciseSequenceType.ExamSimulator) {
          onSequenceComplete();
        } else {
          onSequenceComplete({ allExercisesCompleted });
        }
      }

      if (allExercisesCompleted) {
        startConfetti();
      }
    }

    setCurrentExerciseIndex((prev) => prev + 1);
    setCurrentExerciseFinished(false);
    setHint("");
    setSnackbarOpen(false);
  };

  /**
   * Not ideal, but works for now.
   * Make sure to have the following code inside each exercise component which is
   * evaluated by pushing the "Auswerten"-button:
   *
   * ```
   * useImperativeHandle(ref, () => ({
   *     onConfirm,
   * }));
   * ```
   *
   * And use an appropriate `onConfirm` function inside each exercise component.
   */
  const onConfirm = () => {
    if (componentRef.current?.onConfirm) {
      componentRef.current.onConfirm();
    }
  };

  const cancelButton: JSX.Element = (
    <Button
      onClick={
        onCancel
          ? () => {
              onCancel();
              setSnackbarOpen(false);
            }
          : undefined
      }
      variant="outlined"
      startIcon={<MeetingRoomRounded />}
    >
      {cancelButtonLabelMap[type]}
    </Button>
  );

  const onClickHint = () => {
    if ("question" in currentExercise) {
      setHintAPIRequestState(CBAPIRequestState.Fetching);
      getOpenAIDiNAsHintForQuestion(currentExercise.question)
        .then((response) => {
          setHintAPIRequestState(CBAPIRequestState.Success);
          setHint(response.hint);
        })
        .catch((error) => {
          setHintAPIRequestState(CBAPIRequestState.Error);
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
        {type !== CBExerciseSequenceType.ExamSimulator && (
          <CBDinaHint
            onClick={onClickHint}
            hint={hint}
            isLoading={hintAPIRequestState === CBAPIRequestState.Fetching}
            disabled={
              hintAPIRequestState === CBAPIRequestState.Fetching ||
              hintAPIRequestState === CBAPIRequestState.Error ||
              isCurrentExerciseFinished
            }
          />
        )}

        {exerciseTypesWithConfirmButton.includes(currentExerciseType) && (
          <Button
            onClick={onConfirm}
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

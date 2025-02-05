"use client";

import { CBDinaHint } from "@/components/CBDinaHint/CBDinaHint";
import { CBUnstyledNextLink } from "@/components/CBUnstyledNextLink/CBUnstyledNextLink";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBFreeformQuestionExerciseAIGenerated } from "@/data/exercises/CBFreeformQuestionExercise";
import { CBQuizExercise } from "@/data/exercises/CBQuizExercise";
import { CBAPIRoute } from "@/helpers/apiRoutes";
import { useGenerateHintQuery } from "@/helpers/queries/useGenerateHintQuery";
import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
import { useConfetti } from "@/ui/useConfetti";
import {
  CheckRounded,
  ChevronRightRounded,
  MeetingRoomRounded,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  const { setOpen: setSnackbarOpen } = useCBExerciseSequenceSnackbar();
  const {
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
    currentExerciseIndex,
    setCurrentExerciseIndex,
    exercises,
    type,
  } = useCBExerciseSequence();

  const currentExercise = uncompletedExercises[currentExerciseIndex];
  const currentExerciseType = currentExercise?.type;

  const shouldGenerateHint =
    currentExerciseType === CBExerciseType.Quiz ||
    currentExerciseType === CBExerciseType.AIQuiz ||
    currentExerciseType === CBExerciseType.FreeformQuestionWithCorrectAnswer;

  const {
    data: generatedHintData,
    fetchStatus,
    error,
    refetch,
  } = useGenerateHintQuery(
    (currentExercise as CBQuizExercise | CBFreeformQuestionExerciseAIGenerated)
      ?.question,
  );

  const queryClient = useQueryClient();

  const [hint, setHint] = useState<string>(generatedHintData?.hint || "");

  useEffect(() => {
    if (generatedHintData) {
      setHint(generatedHintData.hint);
    }
  }, [generatedHintData]);

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
    queryClient.resetQueries({ queryKey: [CBAPIRoute.DiNAsHint] });
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

  const hasStaticHint = "hint" in currentExercise && currentExercise.hint;

  const onClickHint = () => {
    if (shouldGenerateHint) {
      refetch();
    } else if (hasStaticHint) {
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
        {type !== CBExerciseSequenceType.ExamSimulator &&
          (shouldGenerateHint || hasStaticHint) && (
            <CBDinaHint
              onClick={onClickHint}
              hint={hint}
              isLoading={fetchStatus === "fetching"}
              disabled={
                fetchStatus === "fetching" ||
                error !== null ||
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

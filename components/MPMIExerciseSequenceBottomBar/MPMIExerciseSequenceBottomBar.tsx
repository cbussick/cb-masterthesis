"use client";

import { MPMIExerciseType } from "@/data/exercises/MPMIExerciseType";
import { useUser } from "@/firebase/useUser";
import { useConfetti } from "@/ui/useConfetti";
import {
  CheckRounded,
  ChevronRightRounded,
  MeetingRoomRounded,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { MPMIDinaHint } from "../MPMIDinaHint/MPMIDinaHint";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";
import { useMPMIExerciseSequence } from "../MPMIExerciseSequence/useMPMIExerciseSequenceProvider";
import { MPMIUnstyledNextLink } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { MPMIConfirmation } from "./MPMIConfirmation";
import { MPMIExerciseSequenceBottomBarProps } from "./MPMIExerciseSequenceBottomBarInterfaces";

const exerciseTypesWithConfirmButton = [
  MPMIExerciseType.FamilyTree,
  MPMIExerciseType.MatchingGame,
];

const cancelButtonLabelMap: Record<MPMIExerciseSequenceType, string> = {
  [MPMIExerciseSequenceType.ExamSimulator]: "Prüfung abbrechen",
  [MPMIExerciseSequenceType.FreePractice]: "Übung beenden",
  [MPMIExerciseSequenceType.TopicWorld]: "Einheit beenden",
  [MPMIExerciseSequenceType.RetryMistakes]: "Fehlerwiederholung beenden",
};

export const MPMIExerciseSequenceBottomBar = ({
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
}: MPMIExerciseSequenceBottomBarProps): JSX.Element | null => {
  const user = useUser();
  const { startConfetti } = useConfetti();

  const {
    isCurrentExerciseFinished,
    setIsCurrentExerciseFinished,
    currentExerciseIndex,
    setCurrentExerciseIndex,
    exercises,
    setExercises,
  } = useMPMIExerciseSequence();

  const currentExercise = uncompletedExercises[currentExerciseIndex];

  if (!currentExercise) {
    return null;
  }

  const currentExerciseType = currentExercise?.type;

  const allExercisesCompleted = exercises.every(
    (exercise) => exercise.isCompleted,
  );

  const moveToNextExercise = () => {
    if (currentExerciseIndex === uncompletedExercises.length - 1) {
      // The last exercise was completed. The whole sequence is completed.
      if (onSequenceComplete) {
        if (sequenceType === MPMIExerciseSequenceType.ExamSimulator) {
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
    setIsCurrentExerciseFinished(false);
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
     * And use an appropriate `onConfirm` function. See `MPMIFamilyTree` for example.
     */
    // @ts-ignore
    if (componentRef.current?.onConfirm) {
      const exerciseConfirmationData =
        componentRef.current.onConfirm() as MPMIConfirmation;

      if (exerciseTypesWithConfirmButton.includes(currentExerciseType)) {
        setIsCurrentExerciseFinished(exerciseConfirmationData.isFinished);

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
            user?.user?.uid &&
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
      onClick={onCancel || undefined}
      variant="outlined"
      startIcon={<MeetingRoomRounded />}
    >
      {cancelButtonLabelMap[sequenceType]}
    </Button>
  );

  return (
    <Stack direction="row" justifyContent="space-between">
      {onCompleteHref ? (
        <MPMIUnstyledNextLink href={onCompleteHref}>
          {cancelButton}
        </MPMIUnstyledNextLink>
      ) : (
        cancelButton
      )}

      <Stack direction="row" justifyContent="flex-end" px={4}>
        <Stack direction="row" spacing={2}>
          {sequenceType !== MPMIExerciseSequenceType.ExamSimulator && (
            <MPMIDinaHint
              hint={currentExercise?.hint}
              disabled={isCurrentExerciseFinished}
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
    </Stack>
  );
};

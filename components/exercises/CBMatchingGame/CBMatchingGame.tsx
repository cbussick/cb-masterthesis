"use client";

import { CBMatchingGameProps } from "@/components/exercises/CBMatchingGame/CBMatchingGameInterfaces";
import { playCorrectSound } from "@/helpers/sounds/playCorrectSound";
import { playIncorrectSound } from "@/helpers/sounds/playIncorrectSound";
import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
import { Box, ButtonProps, Stack } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CBExerciseSequenceType } from "../../CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { useCBExerciseSequence } from "../../CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBImage } from "../../CBImage/CBImage";
import { CBMatchingGameHighlightComponentSide } from "./CBMatchingGameHighlightComponent";
import { CBMatchingGameOption } from "./CBMatchingGameOption";
import { CBMatchingGameSelect } from "./CBMatchingGameSelect/CBMatchingGameSelect";

export const CBMatchingGame = forwardRef(
  (
    { exercise, onCompleteExercise, onMistake }: CBMatchingGameProps,
    ref,
  ): JSX.Element => {
    const { image, highlightedComponents, correctSelection } = exercise;

    const {
      setExercises,
      isCurrentExerciseFinished,
      setCurrentExerciseFinished,
      type,
    } = useCBExerciseSequence();
    const { showSnackbar } = useCBExerciseSequenceSnackbar();

    const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>([
      null,
      null,
      null,
      null,
    ]);

    const [showMistakes, setShowMistakes] = useState<boolean[]>([
      false,
      false,
      false,
      false,
    ]);

    const [randomizedOptions, setRandomizedOptions] = useState<
      CBMatchingGameOption[]
    >([]);

    useEffect(() => {
      setRandomizedOptions(
        [...exercise.options].sort(() => Math.random() - 0.5),
      );
    }, [exercise.options]);

    const onNotFinished = () => {
      showSnackbar(
        "Noch nicht fertig",
        "Du hast noch nicht alle Begriffe zugeordnet. 🤔 Ordne jedem Element im Bild einen Begriff zu.",
        "error",
      );
      playIncorrectSound();
    };

    const onConfirm: ButtonProps["onClick"] = () => {
      const isFinished =
        selectedOptions.filter((o) => o === null).length === 0 ||
        type === CBExerciseSequenceType.ExamSimulator;

      const isCorrect =
        isFinished &&
        selectedOptions.every((o, index) => o === correctSelection[index]);

      if (!isFinished) {
        showSnackbar(
          "Fehler vorhanden",
          "Leider sind noch Fehler vorhanden. 😕 Überprüfe die rot umrandeten Textfelder.",
          "error",
        );
        onNotFinished();
        setShowMistakes(selectedOptions.map((o) => o === null));
      } else {
        setCurrentExerciseFinished(true);

        if (isCorrect) {
          onCompleteExercise({ exerciseId: exercise.id, isCorrect });

          setExercises((previousExercises) => {
            const newExercises = previousExercises.map((ex) => {
              if (ex.id === exercise.id) {
                return {
                  ...ex,
                  isCompleted: true,
                };
              }
              return ex;
            });

            return newExercises;
          });

          playCorrectSound();
        } else {
          if (onMistake) {
            onMistake(exercise);
          }

          playIncorrectSound();
        }
      }
    };

    useImperativeHandle(ref, () => ({
      onConfirm,
    }));

    return (
      <Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <CBImage image={image} />

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              height: "100%",
            }}
          >
            {highlightedComponents.map((component, index) => (
              <Stack
                key={component.id}
                direction={
                  component.side === CBMatchingGameHighlightComponentSide.Left
                    ? "row-reverse"
                    : "row"
                }
                spacing={1}
                sx={{
                  alignItems: "center",
                  position: "absolute",
                  left:
                    component.side === CBMatchingGameHighlightComponentSide.Left
                      ? undefined
                      : component.pointer.x,
                  right:
                    component.side === CBMatchingGameHighlightComponentSide.Left
                      ? component.pointer.x
                      : undefined,
                  top: component.pointer.y,
                }}
              >
                <Box
                  sx={{
                    width: 250,
                    borderBottom: (t) =>
                      `3px solid ${t.palette.secondary.main}`,
                    pointerEvents: "none",
                  }}
                />

                <CBMatchingGameSelect
                  index={index}
                  options={randomizedOptions}
                  setSelectedOptions={setSelectedOptions}
                  isCurrentExerciseFinished={isCurrentExerciseFinished}
                  disabled={isCurrentExerciseFinished}
                  showError={
                    showMistakes[index] ||
                    (isCurrentExerciseFinished &&
                      selectedOptions[index] !== correctSelection[index])
                  }
                  setShowMistakes={setShowMistakes}
                />
              </Stack>
            ))}
          </Box>
        </Stack>
      </Stack>
    );
  },
);

CBMatchingGame.displayName = "CBMatchingGame";

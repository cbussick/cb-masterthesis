"use client";

import { MPMIMatchingGameProps } from "@/components/exercises/MPMIMatchingGame/MPMIMatchingGameInterfaces";
import { playCorrectSound } from "@/helpers/playCorrectSound";
import { playIncorrectSound } from "@/helpers/playIncorrectSound";
import { useSnackbar } from "@/ui/useSnackbar";
import { Box, ButtonProps, Stack } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MPMIConfirmation } from "../../MPMIExerciseSequence/MPMIExerciseSequenceBottomBar/MPMIConfirmation";
import { MPMIExerciseSequenceType } from "../../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";
import { useMPMIExerciseSequence } from "../../MPMIExerciseSequence/useMPMIExerciseSequenceProvider";
import { MPMIImage } from "../../MPMIImage/MPMIImage";
import { MPMIMatchingGameHighlightComponentSide } from "./MPMIMatchingGameHighlightComponent";
import { MPMIMatchingGameSelect } from "./MPMIMatchingGameSelect/MPMIMatchingGameSelect";

export const MPMIMatchingGame = forwardRef(
  ({ exercise, sequenceType }: MPMIMatchingGameProps, ref): JSX.Element => {
    const { options, image, highlightedComponents, correctSelection } =
      exercise;

    const { isCurrentExerciseFinished } = useMPMIExerciseSequence();
    const { showSnackbar } = useSnackbar();

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

    const onNotFinished = () => {
      showSnackbar(
        "Noch nicht fertig",
        "Du hast noch nicht alle Begriffe zugeordnet. 🤔 Ordne jedem Element im Bild einen Begriff zu.",
        "error",
      );
      playIncorrectSound();
    };

    const onConfirm: ButtonProps["onClick"] = (): MPMIConfirmation => {
      const isFinished =
        selectedOptions.filter((o) => o === null).length === 0 ||
        sequenceType === MPMIExerciseSequenceType.ExamSimulator;

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
      } else if (isCorrect) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
      return { isCorrect, isFinished };
    };

    useImperativeHandle(ref, () => ({
      onConfirm,
    }));

    return (
      <Stack>
        <Stack
          direction="row"
          justifyContent="center"
          position="relative"
          width="100%"
        >
          <MPMIImage image={image} />

          <Box position="absolute" left="50%" height="100%">
            {highlightedComponents.map((component, index) => (
              <Stack
                key={component.id}
                direction={
                  component.side === MPMIMatchingGameHighlightComponentSide.Left
                    ? "row-reverse"
                    : "row"
                }
                alignItems="center"
                spacing={1}
                position="absolute"
                left={
                  component.side === MPMIMatchingGameHighlightComponentSide.Left
                    ? undefined
                    : component.pointer.x
                }
                right={
                  component.side === MPMIMatchingGameHighlightComponentSide.Left
                    ? component.pointer.x
                    : undefined
                }
                top={component.pointer.y}
              >
                <Box
                  width={250}
                  borderBottom={(t) => `3px solid ${t.palette.secondary.main}`}
                  sx={{
                    pointerEvents: "none",
                  }}
                />

                <MPMIMatchingGameSelect
                  index={index}
                  options={options}
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

MPMIMatchingGame.displayName = "MPMIMatchingGame";

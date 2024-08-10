"use client";

import { CBEmoji } from "@/components/CBEmoji/CBEmoji";
import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBLoadingButton } from "@/components/CBLoadingButton/CBLoadingButton";
import { useUser } from "@/firebase/useUser";
import { getOpenAIAnswerEvaluation } from "@/helpers/openai/getOpenAIAnswerEvaluation";
import { playCorrectSound } from "@/helpers/sounds/playCorrectSound";
import { playIncorrectSound } from "@/helpers/sounds/playIncorrectSound";
import { useExerciseSequenceSnackbar } from "@/ui/useExerciseSequenceSnackbar";
import { Container, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CBFreeformQuestionProps } from "./CBFreeformQuestionInterfaces";

export const CBFreeformQuestion = ({
  exercise,
  onCompleteExercise,
  onMistake,
}: CBFreeformQuestionProps): JSX.Element => {
  const user = useUser();
  const { showSnackbar } = useExerciseSequenceSnackbar();
  const {
    setExercises,
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
  } = useCBExerciseSequence();

  const [answer, setAnswer] = useState<string>("");
  const [isFetchingResponse, setFetchingResponse] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const disabled = isFetchingResponse || isCurrentExerciseFinished || isError;

  const onConfirm = useCallback(() => {
    setFetchingResponse(true);

    getOpenAIAnswerEvaluation(exercise.question, answer)
      .then((response) => {
        setFetchingResponse(false);

        setCurrentExerciseFinished(true);
        const isCorrect = response.evaluation;

        if (isCorrect && user) {
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
            onMistake({
              id: exercise.id,
              topic: exercise.topic,
              type: exercise.type,
            });
          }

          playIncorrectSound();
        }

        showSnackbar(
          isCorrect ? "Richtige Antwort" : "Falsche Antwort",
          response.reason,
          isCorrect ? "success" : "error",
        );
      })
      .catch((error) => {
        setFetchingResponse(false);
        setError(true);
        showSnackbar("Problem bei der Auswertung", error.message, "error");
      });
  }, [
    answer,
    exercise.id,
    exercise.question,
    exercise.topic,
    exercise.type,
    onCompleteExercise,
    onMistake,
    setCurrentExerciseFinished,
    setExercises,
    showSnackbar,
    user,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!disabled) {
        const { key, ctrlKey } = event;

        if (key === "Enter" && ctrlKey) {
          onConfirm();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, onConfirm]);

  return (
    <Container
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            bgcolor: (t) => t.palette.grey[200],
            p: 2,
          }}
        >
          <CBEmoji emoji="💡" typographyVariant="h1" />

          <Stack justifyContent="center">
            <Typography>
              Zur Auswertung deiner Antwort wird künstliche Intelligenz (KI)
              eingesetzt. Hierbei kann es zu Fehlern kommen.
            </Typography>
          </Stack>
        </Stack>

        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            value={answer}
            label="Deine Antwort"
            onChange={(e) => setAnswer(e.target.value)}
            multiline
            rows={4}
            disabled={disabled}
            sx={{ width: 350 }}
          />

          <CBLoadingButton
            onClick={onConfirm}
            isLoading={isFetchingResponse}
            disabled={disabled}
            sx={{ width: 150 }}
          >
            Abschicken
          </CBLoadingButton>
        </Stack>
      </Stack>
    </Container>
  );
};

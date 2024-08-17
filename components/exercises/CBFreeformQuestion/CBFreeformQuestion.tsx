"use client";

import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBLoadingButton } from "@/components/CBLoadingButton/CBLoadingButton";
import { CBAPIRequestState } from "@/helpers/CBAPIRequestState";
import { getOpenAIAnswerEvaluation } from "@/helpers/openai/getOpenAIAnswerEvaluation";
import { playCorrectSound } from "@/helpers/sounds/playCorrectSound";
import { playIncorrectSound } from "@/helpers/sounds/playIncorrectSound";
import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
import { Alert, Container, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CBFreeformQuestionProps } from "./CBFreeformQuestionInterfaces";

export const CBFreeformQuestion = ({
  exercise,
  onCompleteExercise,
  onMistake,
}: CBFreeformQuestionProps): JSX.Element => {
  const { showSnackbar } = useCBExerciseSequenceSnackbar();
  const {
    setExercises,
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
  } = useCBExerciseSequence();

  const [answer, setAnswer] = useState<string>("");
  const [apiRequestState, setAPIRequestState] = useState<CBAPIRequestState>(
    CBAPIRequestState.Idle,
  );
  const [isTextAreaFocused, setTextAreaFocused] = useState<boolean>(false);

  const disabled =
    apiRequestState === CBAPIRequestState.Fetching ||
    apiRequestState === CBAPIRequestState.Error ||
    isCurrentExerciseFinished;

  const onConfirm = useCallback(() => {
    setAPIRequestState(CBAPIRequestState.Fetching);
    getOpenAIAnswerEvaluation(exercise.question, answer)
      .then((response) => {
        setAPIRequestState(CBAPIRequestState.Success);

        setCurrentExerciseFinished(true);
        const isCorrect = response.evaluation;

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

        showSnackbar(
          isCorrect ? "Richtige Antwort" : "Falsche Antwort",
          response.reason,
          isCorrect ? "success" : "error",
        );
      })
      .catch((error) => {
        setAPIRequestState(CBAPIRequestState.Error);
        showSnackbar("Problem bei der Auswertung", error.message, "error");
      });
  }, [
    answer,
    exercise,
    onCompleteExercise,
    onMistake,
    setCurrentExerciseFinished,
    setExercises,
    showSnackbar,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!disabled) {
        const { key, ctrlKey } = event;

        if (isTextAreaFocused && key === "Enter" && ctrlKey) {
          onConfirm();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, isTextAreaFocused, onConfirm]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={3}>
        <Alert severity="info" sx={{ alignItems: "center" }}>
          <Typography>
            Zur Auswertung deiner Antwort wird künstliche Intelligenz (KI)
            eingesetzt. Hierbei kann es zu Fehlern kommen.
          </Typography>
        </Alert>

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
            rows={5}
            disabled={disabled}
            sx={{ width: 550 }}
            onFocus={() => setTextAreaFocused(true)}
            onBlur={() => setTextAreaFocused(false)}
          />

          <CBLoadingButton
            onClick={onConfirm}
            isLoading={apiRequestState === CBAPIRequestState.Fetching}
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

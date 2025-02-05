"use client";

import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBImage } from "@/components/CBImage/CBImage";
import { CBLoadingButton } from "@/components/CBLoadingButton/CBLoadingButton";
import { CBTextArea } from "@/components/CBTextArea/CBTextArea";
import { CBAPIRequestState } from "@/helpers/CBAPIRequestState";
import { getOpenAIImageLabelEvaluation } from "@/helpers/openai/getOpenAIImageLabelEvaluation";
import { playCorrectSound } from "@/helpers/sounds/playCorrectSound";
import { playIncorrectSound } from "@/helpers/sounds/playIncorrectSound";
import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
import { Alert, Container, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { CBLabelImageProps } from "./CBLabelImageInterfaces";

export const CBLabelImage = ({
  exercise,
  onCompleteExercise,
  onMistake,
}: CBLabelImageProps): JSX.Element => {
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

  const disabled =
    apiRequestState === CBAPIRequestState.Fetching ||
    apiRequestState === CBAPIRequestState.Error ||
    isCurrentExerciseFinished;

  const onConfirm = useCallback(() => {
    setAPIRequestState(CBAPIRequestState.Fetching);

    getOpenAIImageLabelEvaluation(exercise.image.src, answer)
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
          response.feedback,
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
            Das Bild wurde durch künstliche Intelligenz (KI) erstellt. Außerdem
            wird zur Auswertung deiner Antwort KI eingesetzt. Hierbei kann es zu
            Fehlern kommen.
          </Typography>
        </Alert>

        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <CBImage image={exercise.image} />

          <CBTextArea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            label="Deine Antwort"
            disabled={disabled}
            onConfirm={onConfirm}
            rows={2}
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

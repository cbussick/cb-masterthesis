"use client";

import { CBEmoji } from "@/components/CBEmoji/CBEmoji";
import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBLoadingButton } from "@/components/CBLoadingButton/CBLoadingButton";
import { useUser } from "@/firebase/useUser";
import { getOpenAIAnswerEvaluation } from "@/helpers/getOpenAIAnswerEvaluation";
import { playCorrectSound } from "@/helpers/playCorrectSound";
import { playIncorrectSound } from "@/helpers/playIncorrectSound";
import { useSnackbar } from "@/ui/useSnackbar";
import { Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CBFreeformQuestionProps } from "./CBFreeformQuestionInterfaces";

export const CBFreeformQuestion = ({
  exercise,
  onCompleteExercise,
  onMistake,
}: CBFreeformQuestionProps): JSX.Element => {
  const user = useUser();
  const { showSnackbar } = useSnackbar();
  const {
    setExercises,
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
  } = useCBExerciseSequence();

  const [answer, setAnswer] = useState<string>("");
  const [isFetchingResponse, setFetchingResponse] = useState<boolean>(false);

  const onConfirm = () => {
    setFetchingResponse(true);

    getOpenAIAnswerEvaluation(exercise.question, answer).then((response) => {
      setFetchingResponse(false);

      setCurrentExerciseFinished(true);
      const isCorrect = response.startsWith("Ja");

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

      const responseText = response.split(";; ")[1];

      showSnackbar(
        isCorrect ? "Richtige Antwort" : "Falsche Antwort",
        responseText,
        isCorrect ? "success" : "error",
      );
    });
  };

  return (
    <Container
      maxWidth="lg"
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

          <Stack>
            <Typography variant="h3">Beta</Typography>

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
            disabled={isFetchingResponse || isCurrentExerciseFinished}
            sx={{ width: 350 }}
          />

          <CBLoadingButton
            onClick={onConfirm}
            isLoading={isFetchingResponse}
            disabled={isFetchingResponse || isCurrentExerciseFinished}
            sx={{ width: 150 }}
          >
            Abschicken
          </CBLoadingButton>
        </Stack>
      </Stack>
    </Container>
  );
};

"use client";

import { MPMIEmoji } from "@/components/MPMIEmoji/MPMIEmoji";
import { useMPMIExerciseSequence } from "@/components/MPMIExerciseSequence/useMPMIExerciseSequenceProvider";
import { MPMILoadingButton } from "@/components/MPMILoadingButton/MPMILoadingButton";
import { useUser } from "@/firebase/useUser";
import { getOpenAIAnswerEvaluation } from "@/helpers/getOpenAIAnswerEvaluation";
import { playCorrectSound } from "@/helpers/playCorrectSound";
import { playIncorrectSound } from "@/helpers/playIncorrectSound";
import { useSnackbar } from "@/ui/useSnackbar";
import { Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { MPMIFreeformQuestionProps } from "./MPMIFreeformQuestionInterfaces";

export const MPMIFreeformQuestion = ({
  exercise,
  onCompleteExercise,
  onMistake,
}: MPMIFreeformQuestionProps): JSX.Element => {
  const user = useUser();
  const { showSnackbar } = useSnackbar();
  const {
    setExercises,
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
  } = useMPMIExerciseSequence();

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
          bgcolor={(t) => t.palette.grey[200]}
          p={2}
          spacing={2}
        >
          <MPMIEmoji emoji="💡" typographyVariant="h1" />

          <Stack>
            <Typography variant="h3">Beta</Typography>

            <Typography>
              Zur Auswertung deiner Antwort wird künstliche Intelligenz (KI)
              eingesetzt. Hierbei kann es zu Fehlern kommen.
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} alignItems="center">
          <TextField
            value={answer}
            label="Deine Antwort"
            onChange={(e) => setAnswer(e.target.value)}
            multiline
            rows={4}
            sx={{ width: 350 }}
            disabled={isFetchingResponse || isCurrentExerciseFinished}
          />

          <MPMILoadingButton
            onClick={onConfirm}
            isLoading={isFetchingResponse}
            disabled={isFetchingResponse || isCurrentExerciseFinished}
            sx={{ width: 150 }}
          >
            Abschicken
          </MPMILoadingButton>
        </Stack>
      </Stack>
    </Container>
  );
};

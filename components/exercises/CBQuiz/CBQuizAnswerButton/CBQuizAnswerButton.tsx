"use client";

import { CBAnswerButton } from "@/components/CBAnswerButton/CBAnswerButton";
import { Stack, Typography } from "@mui/material";
import { CBQuizAnswerButtonProps } from "./CBQuizAnswerButtonInterfaces";

export const CBQuizAnswerButton = ({
  answer,
  isCorrect,
  onClick,
  isCurrentExerciseFinished,
  clickedButton,
  sx,
}: CBQuizAnswerButtonProps): JSX.Element => {
  return (
    <CBAnswerButton
      id={answer.id}
      isCorrect={isCorrect}
      onClick={onClick}
      isCurrentExerciseFinished={isCurrentExerciseFinished}
      disabled={isCurrentExerciseFinished}
      clickedButton={clickedButton}
      sx={{
        height: "100%",
        ...sx,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: (t) => t.typography.fontWeightBold,
          }}
        >
          {answer.id}
        </Typography>

        <Typography variant="h3">{answer.text}</Typography>
      </Stack>
    </CBAnswerButton>
  );
};

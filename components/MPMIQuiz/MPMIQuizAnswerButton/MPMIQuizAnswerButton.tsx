"use client";

import { Stack, Typography } from "@mui/material";
import { MPMIAnswerButton } from "../../MPMIAnswerButton/MPMIAnswerButton";
import { MPMIQuizAnswerButtonProps } from "./MPMIQuizAnswerButtonInterfaces";

export const MPMIQuizAnswerButton = ({
  answer,
  isCorrect,
  onClick,
  isCurrentExerciseFinished,
  clickedButton,
  sx,
}: MPMIQuizAnswerButtonProps): JSX.Element => {
  return (
    <MPMIAnswerButton
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
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography
          variant="h3"
          fontWeight={(t) => t.typography.fontWeightBold}
        >
          {answer.id}
        </Typography>

        <Typography variant="h3">{answer.text}</Typography>
      </Stack>
    </MPMIAnswerButton>
  );
};

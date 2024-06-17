"use client";

import { CBAnswerButton } from "@/components/CBAnswerButton/CBAnswerButton";
import { Stack, Typography } from "@mui/material";
import { CBQuizAnswerButtonProps } from "./CBQuizAnswerButtonInterfaces";

const answerIndexToLetterMap: Record<number, string> = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};

export const CBQuizAnswerButton = ({
  answer,
  isCorrect,
  onClick,
  isCurrentExerciseFinished,
  clickedButton,
  sx,
  index,
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
          {answerIndexToLetterMap[index]}
        </Typography>

        <Typography variant="h3">{answer.text}</Typography>
      </Stack>
    </CBAnswerButton>
  );
};

"use client";

import { Button, Theme } from "@mui/material";
import { CBAnswerButtonProps } from "./CBAnswerButtonInterfaces";

export const getButtonBackgroundColor = (
  isConfirmed: boolean,
  isCorrect: boolean,
  wasClicked: boolean,
  theme: Theme,
): string => {
  if (isConfirmed) {
    if (isCorrect) {
      return theme.palette.primary.main;
    }
    if (wasClicked) {
      return theme.palette.error.main;
    }
  }
  return theme.palette.grey[200];
};

export const getButtonTextColor = (
  isConfirmed: boolean,
  isCorrect: boolean,
  wasClicked: boolean,
  theme: Theme,
): string => {
  if (isConfirmed) {
    if (isCorrect) {
      return theme.palette.primary.contrastText;
    }
    if (wasClicked) {
      return theme.palette.error.contrastText;
    }
    return theme.palette.text.disabled;
  }
  return theme.palette.text.primary;
};

export const CBAnswerButton = ({
  id,
  children,
  isCorrect,
  onClick,
  isCurrentExerciseFinished,
  disabled,
  clickedButton,
  onMouseEnter,
  onMouseLeave,
  sx,
}: CBAnswerButtonProps): JSX.Element => {
  const wasClicked = clickedButton === id;

  return (
    <Button
      id={id}
      disabled={isCurrentExerciseFinished || disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        width: "100%",
        minHeight: 75,
        p: 2,
        borderRadius: 5,
        backgroundColor: (t) =>
          getButtonBackgroundColor(
            isCurrentExerciseFinished,
            isCorrect,
            wasClicked,
            t,
          ),
        color: (t) =>
          getButtonTextColor(
            isCurrentExerciseFinished,
            isCorrect,
            wasClicked,
            t,
          ),
        "&:hover": {
          backgroundColor: (t) =>
            getButtonBackgroundColor(
              isCurrentExerciseFinished,
              isCorrect,
              wasClicked,
              t,
            ),
          color: (t) =>
            getButtonTextColor(
              isCurrentExerciseFinished,
              isCorrect,
              wasClicked,
              t,
            ),
        },
        ":disabled": {
          backgroundColor: (t) =>
            getButtonBackgroundColor(
              isCurrentExerciseFinished,
              isCorrect,
              wasClicked,
              t,
            ),
          color: (t) =>
            getButtonTextColor(
              isCurrentExerciseFinished,
              isCorrect,
              wasClicked,
              t,
            ),
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

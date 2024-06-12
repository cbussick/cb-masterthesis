"use client";

import { CBAnswerButton } from "@/components/CBAnswerButton/CBAnswerButton";
import { swiperCellTypes } from "@/data/exercises/CBSwiperExercise";
import { Typography } from "@mui/material";
import { CBSwiperButtonProps } from "./CBSwiperButtonInterfaces";

export const CBSwiperButton = ({
  cellType,
  isCorrect,
  onClick,
  isCurrentExerciseFinished,
  clickedButton,
  onMouseEnter,
  onMouseLeave,
  sx,
}: CBSwiperButtonProps): JSX.Element => {
  const cellTypeData = swiperCellTypes[cellType];

  return (
    <CBAnswerButton
      id={cellType}
      isCorrect={isCorrect}
      onClick={onClick}
      isCurrentExerciseFinished={isCurrentExerciseFinished}
      clickedButton={clickedButton}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        width: "75%",
        height: 245,
        ...sx,
      }}
    >
      <Typography variant="h3">{cellTypeData.name}</Typography>
    </CBAnswerButton>
  );
};

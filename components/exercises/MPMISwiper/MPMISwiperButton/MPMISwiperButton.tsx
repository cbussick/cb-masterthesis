"use client";

import { MPMIAnswerButton } from "@/components/MPMIAnswerButton/MPMIAnswerButton";
import { swiperCellTypes } from "@/data/exercises/MPMISwiperExercise";
import { Typography } from "@mui/material";
import { MPMISwiperButtonProps } from "./MPMISwiperButtonInterfaces";

export const MPMISwiperButton = ({
  cellType,
  isCorrect,
  onClick,
  isCurrentExerciseFinished,
  clickedButton,
  onMouseEnter,
  onMouseLeave,
  sx,
}: MPMISwiperButtonProps): JSX.Element => {
  const cellTypeData = swiperCellTypes[cellType];

  return (
    <MPMIAnswerButton
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
    </MPMIAnswerButton>
  );
};

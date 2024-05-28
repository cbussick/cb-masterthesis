import { MPMISwiperCellType } from "@/data/exercises/MPMISwiperExercise";
import { ButtonProps } from "@mui/material";

export interface MPMISwiperButtonProps {
  cellType: MPMISwiperCellType;
  isCorrect: boolean;
  onClick: ButtonProps["onClick"];
  isCurrentExerciseFinished: boolean;
  clickedButton: string;
  onMouseEnter?: ButtonProps["onMouseEnter"];
  onMouseLeave?: ButtonProps["onMouseLeave"];
  sx?: ButtonProps["sx"];
}

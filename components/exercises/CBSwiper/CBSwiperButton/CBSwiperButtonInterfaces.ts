import { CBSwiperCellType } from "@/data/exercises/CBSwiperExercise";
import { ButtonProps } from "@mui/material";

export interface CBSwiperButtonProps {
  cellType: CBSwiperCellType;
  isCorrect: boolean;
  onClick: ButtonProps["onClick"];
  isCurrentExerciseFinished: boolean;
  clickedButton: string;
  onMouseEnter?: ButtonProps["onMouseEnter"];
  onMouseLeave?: ButtonProps["onMouseLeave"];
  sx?: ButtonProps["sx"];
}

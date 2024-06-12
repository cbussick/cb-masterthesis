import { ButtonProps } from "@mui/material";

export interface CBAnswerButtonProps {
  id: string;
  children: ButtonProps["children"];
  isCorrect: boolean;
  onClick: ButtonProps["onClick"];
  isCurrentExerciseFinished: boolean;
  disabled?: boolean;
  clickedButton: string;
  onMouseEnter?: ButtonProps["onMouseEnter"];
  onMouseLeave?: ButtonProps["onMouseLeave"];
  sx?: ButtonProps["sx"];
}

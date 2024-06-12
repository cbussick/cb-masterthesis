import { CBAnswer } from "@/data/exercises/CBAnswer";
import { ButtonProps } from "@mui/material";

export interface CBQuizAnswerButtonProps {
  answer: CBAnswer;
  isCorrect: boolean;
  onClick: ButtonProps["onClick"];
  isCurrentExerciseFinished: boolean;
  clickedButton: string;
  sx?: ButtonProps["sx"];
}

import { MPMIAnswer } from "@/data/exercises/MPMIAnswer";
import { ButtonProps } from "@mui/material";

export interface MPMIQuizAnswerButtonProps {
  answer: MPMIAnswer;
  isCorrect: boolean;
  onClick: ButtonProps["onClick"];
  isCurrentExerciseFinished: boolean;
  clickedButton: string;
  sx?: ButtonProps["sx"];
}

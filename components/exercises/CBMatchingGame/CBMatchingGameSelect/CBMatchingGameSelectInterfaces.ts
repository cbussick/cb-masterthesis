import { SelectProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { CBMatchingGameOption } from "../CBMatchingGameOption";

export interface CBMatchingGameSelectProps {
  index: number;
  options: CBMatchingGameOption[];
  setSelectedOptions: Dispatch<SetStateAction<(number | null)[]>>;
  isCurrentExerciseFinished: boolean;
  disabled: SelectProps["disabled"];
  showError: boolean;
  setShowMistakes: Dispatch<SetStateAction<boolean[]>>;
}

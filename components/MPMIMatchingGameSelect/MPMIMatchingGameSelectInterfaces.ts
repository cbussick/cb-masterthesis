import { SelectProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { MPMIMatchingGameOption } from "../MPMIMatchingGame/MPMIMatchingGameOption";

export interface MPMIMatchingGameSelectProps {
  index: number;
  options: MPMIMatchingGameOption[];
  setSelectedOptions: Dispatch<SetStateAction<(number | null)[]>>;
  isCurrentExerciseFinished: boolean;
  disabled: SelectProps["disabled"];
  showError: boolean;
  setShowMistakes: Dispatch<SetStateAction<boolean[]>>;
}

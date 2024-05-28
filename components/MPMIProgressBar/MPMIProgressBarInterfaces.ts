import { LinearProgressProps } from "@mui/material";

export type MPMIProgressBarHeight = "small" | "large";
export type MPMIProgressBarFormat = "fraction" | "percent";

export interface MPMIProgressBarProps {
  currentValue: number;
  maxValue: number;
  width?: number | string;
  height?: MPMIProgressBarHeight;
  color?: LinearProgressProps["color"];
  rounded?: boolean;
  format?: MPMIProgressBarFormat;
}

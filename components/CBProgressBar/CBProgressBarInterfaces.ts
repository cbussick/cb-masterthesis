import { LinearProgressProps } from "@mui/material";

export type CBProgressBarHeight = "small" | "large";
export type CBProgressBarFormat = "fraction" | "percent";

export interface CBProgressBarProps {
  currentValue: number;
  maxValue: number;
  width?: number | string;
  height?: CBProgressBarHeight;
  color?: LinearProgressProps["color"];
  format?: CBProgressBarFormat;
}

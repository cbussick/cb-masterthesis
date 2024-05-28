"use client";

import { LinearProgress, Stack, Typography } from "@mui/material";
import {
  MPMIProgressBarHeight,
  MPMIProgressBarProps,
} from "./MPMIProgressBarInterfaces";

const heightMap: Record<MPMIProgressBarHeight, number> = {
  small: 10,
  large: 15,
};

export const MPMIProgressBar = ({
  currentValue,
  maxValue,
  height,
  width,
  color,
  rounded,
  format,
}: MPMIProgressBarProps): JSX.Element => {
  const value = Math.round((currentValue / maxValue) * 100);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <LinearProgress
        variant="determinate"
        color={color === undefined ? "primary" : color}
        value={value}
        sx={{
          width: width === undefined ? 300 : width,
          height: heightMap[height === undefined ? "large" : height],
          borderRadius: rounded === undefined || rounded ? 5 : undefined,
        }}
      />

      <Typography whiteSpace="nowrap">
        {format === undefined || format === "fraction"
          ? `${currentValue}/${maxValue}`
          : `${value} %`}
      </Typography>
    </Stack>
  );
};

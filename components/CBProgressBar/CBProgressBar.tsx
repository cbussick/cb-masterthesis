"use client";

import { LinearProgress, Stack, Typography } from "@mui/material";
import {
  CBProgressBarHeight,
  CBProgressBarProps,
} from "./CBProgressBarInterfaces";

const heightMap: Record<CBProgressBarHeight, number> = {
  small: 10,
  large: 15,
};

export const CBProgressBar = ({
  currentValue,
  maxValue,
  height,
  width,
  color,
  rounded,
  format,
}: CBProgressBarProps): JSX.Element => {
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

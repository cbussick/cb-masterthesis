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
  format,
}: CBProgressBarProps): JSX.Element => {
  const value = Math.round((currentValue / maxValue) * 100);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          width: width === undefined ? 300 : width,
          height: heightMap[height === undefined ? "large" : height],
          borderRadius: 5,
        }}
      />

      <Typography
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {format === undefined || format === "fraction"
          ? `${currentValue}/${maxValue}`
          : `${value} %`}
      </Typography>
    </Stack>
  );
};

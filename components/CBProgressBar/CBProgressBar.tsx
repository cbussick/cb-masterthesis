import {
  LinearProgress,
  linearProgressClasses,
  Stack,
  Typography,
} from "@mui/material";
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

  const progressFormat =
    format === undefined || format === "fraction" ? "fraction" : "percent";

  const maxValueDigitAmount =
    progressFormat === "fraction" ? maxValue.toString().length : null;

  const currentValueFractionString =
    maxValueDigitAmount && `${currentValue}`.padStart(maxValueDigitAmount, "0");

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
          [`& .${linearProgressClasses.bar}`]: {
            transitionDuration: "0.25s",
          },
        }}
      />

      <Typography
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {progressFormat === "fraction"
          ? `${currentValueFractionString}/${maxValue}`
          : `${value} %`}
      </Typography>
    </Stack>
  );
};

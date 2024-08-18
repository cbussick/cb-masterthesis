"use client";

import { getFormattedTimeInMinutesAndSeconds } from "@/helpers/time-tracking/getFormattedTimeInMinutesAndSeconds";
import TimerIcon from "@mui/icons-material/Timer";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const CBExerciseTimer = (): JSX.Element | null => {
  const [passedSeconds, setPassedSeconds] = useState<number>(0);

  const passedMinutes = Math.floor(passedSeconds / 60);
  const isTimerExpired = passedMinutes >= 5;

  const updateTimer = () => {
    setPassedSeconds((prev) => prev + 1);
  };

  useEffect(() => {
    const id = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TimerIcon
        sx={{
          color: (t) =>
            isTimerExpired ? t.palette.error.main : t.palette.grey[600],
        }}
      />

      <Typography
        sx={{
          color: isTimerExpired ? (t) => t.palette.error.main : undefined,
        }}
      >
        {`${getFormattedTimeInMinutesAndSeconds(passedSeconds)} / 20:00`}
      </Typography>
    </Stack>
  );
};

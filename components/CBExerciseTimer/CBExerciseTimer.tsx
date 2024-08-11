"use client";

import { CBTrackedTime } from "@/firebase/client/UserCustomDataConverter";
import { addTrackedTimeToUser } from "@/firebase/client/addTrackedTimeToUser";
import { useUser } from "@/firebase/client/useUser";
import TimerIcon from "@mui/icons-material/Timer";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CBExerciseTimerProps, CBTime } from "./CBExerciseTimerInterfaces";

export const CBExerciseTimer = forwardRef(
  (
    { setCompletionTime, isVisible }: CBExerciseTimerProps,
    ref,
  ): JSX.Element | null => {
    const user = useUser();

    const [time, setTime] = useState<CBTime>({
      sec: 0,
      min: 0,
    });

    const isTimerExpired = time.min >= 5;

    const updateTimer = () => {
      setTime((prev) => {
        const newTime = { ...prev };
        if (newTime.sec < 59) newTime.sec += 1;
        else {
          newTime.min += 1;
          newTime.sec = 0;
        }
        if (newTime.min === 60) {
          newTime.min = 0;
        }

        return newTime;
      });
    };

    useEffect(() => {
      const id = setInterval(updateTimer, 1000);

      return () => {
        clearInterval(id);
      };
    }, []);

    const onSequenceComplete = () => {
      setCompletionTime(time);
      const today = dayjs();
      const formattedDate = today.format("YYYY-MM-DD");

      if (user?.user) {
        const trackedTime: CBTrackedTime = {
          date: formattedDate,
          time: time.sec + time.min * 60,
        };

        addTrackedTimeToUser(user.user.uid, trackedTime);
      }
    };

    useImperativeHandle(ref, () => ({
      onSequenceComplete,
    }));

    return isVisible ? (
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
          {`${time.min < 10 ? 0 : ""}${time.min}:${time.sec < 10 ? 0 : ""}${
            time.sec
          } / 20:00`}
        </Typography>
      </Stack>
    ) : null;
  },
);

CBExerciseTimer.displayName = "CBExerciseTimer";

"use client";

import { levels } from "@/data/gamification";
import { useUser } from "@/firebase-client/useUser";
import { calculateHoursAndMinutes } from "@/helpers/time-tracking/calculateHoursAndMinutes";
import { getLastWeekTimes } from "@/helpers/time-tracking/getLastWeekTimes";
import { Stack, Typography } from "@mui/material";
import { CBDateCalendar } from "../CBDateCalendar/CBDateCalendar";
import { CBProgressCard } from "../CBProgressCard/CBProgressCard";
import { CBTrackedTimeGraph } from "../CBTrackedTimeGraph/CBTrackedTimeGraph";
import { CBUserActionsBar } from "../CBUserActionsBar/CBUserActionsBar";
import { CBWelcomeBanner } from "../CBWelcomeBanner/CBWelcomeBanner";

export const CBDashboardStudent = (): JSX.Element => {
  const { customData } = useUser();

  const { points } = customData;

  const lastWeekTimes = getLastWeekTimes(customData.trackedTime);
  const totalTimeLastWeek = lastWeekTimes.reduce((acc, t) => {
    return acc + t.time;
  }, 0);

  const formattedTime = calculateHoursAndMinutes(totalTimeLastWeek);

  const currentLevel =
    levels.find((l) => l.pointsToNextLevel && l.pointsToNextLevel > points) ||
    levels[levels.length - 1];

  const userLvlTitleText = `Level ${currentLevel.level}: ${currentLevel.description}`;
  const pointsToNextLvl = currentLevel.pointsToNextLevel || points;
  const maxLevelReached = !currentLevel.pointsToNextLevel;

  return (
    <Stack spacing={3} sx={{ overflowY: "hidden", flex: 1 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <CBWelcomeBanner />

        <CBUserActionsBar />
      </Stack>

      {/* `p` is necessary to not have the card shadows cut off */}
      <Stack spacing={3} sx={{ overflowY: "auto", p: 0.5, flex: 1 }}>
        <Stack
          direction="row"
          spacing={5}
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Stack sx={{ flex: 1 }}>
            <CBProgressCard
              image={{ src: "/topics/zelle.jpg", alt: "Zelle" }}
              title={userLvlTitleText}
              subTitle={
                maxLevelReached
                  ? `Du hast das höchste Level erreicht. Vielen Dank fürs Spielen! Du kannst gerne weiterhin Lernen und Punkte sammeln. Du hast ${points} Punkte.`
                  : `Du hast ${points} ${
                      points !== 1 ? "Punkte" : "Punkt"
                    }. Noch ${pointsToNextLvl - points} ${
                      pointsToNextLvl - points !== 1 ? "Punkte" : "Punkt"
                    } bis zur nächsten Auszeichnung!`
              }
              progressValue={points}
              maxValue={pointsToNextLvl}
            />
          </Stack>

          <CBDateCalendar />
        </Stack>

        <Stack spacing={1} sx={{ flex: 1 }}>
          <Typography>{`Du hast in dieser Woche insgesamt ${formattedTime.h === 0 ? `${formattedTime.min} Minuten lang gelernt` : `${formattedTime.h} Stunden und ${formattedTime.min} Minuten lang gelernt`}:`}</Typography>

          {/* Necessary to not render the graph while on the server, because then the calendar is not yet */}
          <CBTrackedTimeGraph lastWeekTimes={lastWeekTimes} />
        </Stack>
      </Stack>
    </Stack>
  );
};

"use client";

import { levels } from "@/data/gamification";
import { useUser } from "@/firebase-client/useUser";
import { calculateHoursAndMinutesAndSeconds } from "@/helpers/time-tracking/calculateHoursAndMinutesAndSeconds";
import { getThisWeekTimes } from "@/helpers/time-tracking/getThisWeekTimes";
import { Stack, Typography } from "@mui/material";
import { CBDateCalendar } from "../CBDateCalendar/CBDateCalendar";
import { CBEmoji } from "../CBEmoji/CBEmoji";
import { CBProgressCard } from "../CBProgressCard/CBProgressCard";
import { CBTrackedTimeGraph } from "../CBTrackedTimeGraph/CBTrackedTimeGraph";
import { CBUserActionsBar } from "../CBUserActionsBar/CBUserActionsBar";
import { CBWelcomeBanner } from "../CBWelcomeBanner/CBWelcomeBanner";

export const CBDashboardStudent = (): JSX.Element => {
  const { customData } = useUser();

  const { points } = customData;

  const thisWeekTimes = getThisWeekTimes(customData.trackedTime);
  const totalTimeThisWeek = thisWeekTimes.reduce((acc, t) => {
    return acc + t.time;
  }, 0);

  const { hours, minutes, seconds } =
    calculateHoursAndMinutesAndSeconds(totalTimeThisWeek);

  const currentLevel =
    levels.find((l) => l.pointsToNextLevel && l.pointsToNextLevel > points) ||
    levels[levels.length - 1];

  const userLvlTitleText = `Level ${currentLevel.level}: ${currentLevel.description}`;
  const pointsToNextLvl = currentLevel.pointsToNextLevel || points;
  const maxLevelReached = !currentLevel.pointsToNextLevel;

  const hoursStringPart =
    hours === 0 ? "" : `${hours} ${hours === 1 ? "Stunde" : "Stunden"}`;
  const minutesStringPart =
    minutes === 0 && hours === 0
      ? ""
      : `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`;
  const secondsStringPart =
    seconds === 0 ? "" : `${seconds} ${seconds === 1 ? "Sekunde" : "Sekunden"}`;

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
          {hours === 0 && minutes === 0 && seconds === 0 ? (
            <Stack direction="row" spacing={1}>
              <Typography>
                Du hast in dieser Woche noch nicht gelernt. Viel Erfolg!
              </Typography>

              <CBEmoji emoji="💪" />
            </Stack>
          ) : (
            <Typography>
              {`Du hast in dieser Woche insgesamt ${hoursStringPart} ${minutesStringPart} ${secondsStringPart} lang gelernt:`}
            </Typography>
          )}

          <CBTrackedTimeGraph thisWeekTimes={thisWeekTimes} />
        </Stack>
      </Stack>
    </Stack>
  );
};

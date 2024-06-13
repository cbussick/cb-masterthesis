"use client";

import { levels } from "@/data/gamification";
import { useUser } from "@/firebase/useUser";
import { getFormattedTimeFromSeconds } from "@/helpers/getFormattedTime";
import { getLastWeekTimes } from "@/helpers/getLastWeekTimes";
import { Divider, Stack } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { CBDateCalendar } from "../CBDateCalendar/CBDateCalendar";
import { CBGraphCard } from "../CBGraphCard/CBGraphCard";
import { CBInfoCard } from "../CBInfoCard/CBInfoCard";
import { CBProgressCard } from "../CBProgressCard/CBProgressCard";
import { CBTrackedTimeGraph } from "../CBTrackedTimeGraph/CBTrackedTimeGraph";
import { CBUserActionsBar } from "../CBUserActionsBar/CBUserActionsBar";
import { CBWelcomeBanner } from "../CBWelcomeBanner/CBWelcomeBanner";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 3,
};

export const CBDashboardStudent = (): JSX.Element => {
  const user = useUser();
  const userPoints = user?.customData.points || 0;

  const lastWeekTimes = getLastWeekTimes(user?.customData.trackedTime || []);
  const totalTime = lastWeekTimes.reduce((acc, t) => {
    return acc + t.time;
  }, 0);

  const formattedTime = getFormattedTimeFromSeconds(totalTime);

  let userLvlTitleText = "";
  let pointsToNextLvl = 0;
  let maxLevelReached = false;

  const currentLevel =
    levels.find(
      (l) => l.pointsToNextLevel && l.pointsToNextLevel > userPoints,
    ) || levels[levels.length - 1];

  if (currentLevel.pointsToNextLevel) {
    userLvlTitleText = `Level ${currentLevel.level}: ${currentLevel.description}`;
    pointsToNextLvl = currentLevel.pointsToNextLevel;
  } else {
    userLvlTitleText = `Level ${currentLevel.level}: ${currentLevel.description}`;
    pointsToNextLvl = userPoints;
    maxLevelReached = true;
  }

  return (
    <Stack>
      <Stack spacing={3}>
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

        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              width: "60%",
            }}
          >
            <CBProgressCard
              image="/topics/zelle.jpg"
              title={userLvlTitleText}
              subTitle={
                maxLevelReached
                  ? `Du hast das höchste Level erreicht. Vielen Dank fürs Spielen! Du kannst gerne weiterhin Lernen und Punkte sammeln. Du hast ${userPoints} Punkte.`
                  : `Du hast ${userPoints} ${
                      userPoints !== 1 ? "Punkte" : "Punkt"
                    }. Noch ${pointsToNextLvl - userPoints} ${
                      pointsToNextLvl - userPoints !== 1 ? "Punkte" : "Punkt"
                    } bis zur nächsten Auszeichnung!`
              }
              progressValue={userPoints}
              maxValue={pointsToNextLvl}
            />

            <CBGraphCard
              image="/flask.jpg"
              title={`${formattedTime.h}h ${formattedTime.min}min`}
              subTitle={`Du hast diese Woche bislang ${formattedTime.h} ${
                formattedTime.h === 1 ? "Stunde" : "Stunden"
              } und ${formattedTime.min} ${
                formattedTime.min === 1 ? "Minute" : "Minuten"
              } gelernt`}
              graph={<CBTrackedTimeGraph lastWeekTimes={lastWeekTimes} />}
            />
          </Stack>

          <CBDateCalendar />
        </Stack>
      </Stack>

      <Divider sx={{ mt: 3, mb: 5 }} />

      <Grid container spacing={3}>
        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/coming-soon/coming-soon.jpg"
            text="Tägliche Herausforderungen"
            disabled
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/lab-equipment.jpg"
            text="Themenwelt"
            href="/themenwelt"
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/topics/zelle.jpg"
            text="Tierische und pflanzliche Zellen"
            href="/freie-uebung/zelle"
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/pruefungssimulator.jpg"
            text="Prüfungssimulator"
            href="pruefungssimulator"
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

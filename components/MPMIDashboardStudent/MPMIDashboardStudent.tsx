"use client";

import { levels } from "@/data/gamification";
import { useUser } from "@/firebase/useUser";
import { getFormattedTimeFromSeconds } from "@/helpers/getFormattedTime";
import { getLastWeekTimes } from "@/helpers/getLastWeekTimes";
import { Divider, Stack } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { MPMIDateCalendar } from "../MPMIDateCalendar/MPMIDateCalendar";
import { MPMIGraphCard } from "../MPMIGraphCard/MPMIGraphCard";
import { MPMIInfoCard } from "../MPMIInfoCard/MPMIInfoCard";
import { MPMIProgressCard } from "../MPMIProgressCard/MPMIProgressCard";
import { MPMITrackedTimeGraph } from "../MPMITrackedTimeGraph/MPMITrackedTimeGraph";
import { MPMIUserActionsBar } from "../MPMIUserActionsBar/MPMIUserActionsBar";
import { MPMIWelcomeBanner } from "../MPMIWelcomeBanner/MPMIWelcomeBanner";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 3,
};

export const MPMIDashboardStudent = (): JSX.Element => {
  const user = useUser();
  const userPoints = user?.customData.points || 0;
  const userTimes = user?.customData.trackedTime || [];

  const lastWeekTimes = getLastWeekTimes(userTimes);

  const totalTime = lastWeekTimes.reduce((acc, t) => {
    return acc + t.time;
  }, 0);

  const formattedTime = getFormattedTimeFromSeconds(totalTime);

  const [userLvlTitleText, setUserLvlTitleText] = useState<string>("");
  const [pointsToNextLvl, setPointsToNextLvl] = useState<number>(0);
  const [maxLevelReached, setMaxLevelReached] = useState<boolean>(false);

  useEffect(() => {
    const currentLevel =
      levels.find(
        (l) => l.pointsToNextLevel && l.pointsToNextLevel > userPoints,
      ) || levels[levels.length - 1];

    if (currentLevel.pointsToNextLevel) {
      setUserLvlTitleText(
        `Level ${currentLevel.level}: ${currentLevel.description}`,
      );
      setPointsToNextLvl(currentLevel.pointsToNextLevel);
    } else {
      setUserLvlTitleText(
        `Level ${currentLevel.level}: ${currentLevel.description}`,
      );
      setPointsToNextLvl(userPoints);
      setMaxLevelReached(true);
    }
  }, [userPoints]);

  return (
    <Stack>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
        >
          <MPMIWelcomeBanner />

          <MPMIUserActionsBar />
        </Stack>

        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack spacing={2} width="60%">
            <MPMIProgressCard
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

            <MPMIGraphCard
              image="/flask.jpg"
              title={`${formattedTime.h}h ${formattedTime.min}min`}
              subTitle={`Du hast diese Woche bislang ${formattedTime.h} ${
                formattedTime.h === 1 ? "Stunde" : "Stunden"
              } und ${formattedTime.min} ${
                formattedTime.min === 1 ? "Minute" : "Minuten"
              } gelernt`}
              graph={<MPMITrackedTimeGraph lastWeekTimes={lastWeekTimes} />}
            />
          </Stack>

          <MPMIDateCalendar />
        </Stack>
      </Stack>

      <Divider sx={{ mt: 3, mb: 5 }} />

      <Grid container spacing={3}>
        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/coming-soon/coming-soon.jpg"
            text="Tägliche Herausforderungen"
            disabled
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/lab-equipment.jpg"
            text="Themenwelt"
            href="/themenwelt"
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/topics/zelle.jpg"
            text="Tierische und pflanzliche Zellen"
            href="/freie-uebung/zelle"
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/pruefungssimulator.jpg"
            text="Prüfungssimulator"
            href="pruefungssimulator"
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

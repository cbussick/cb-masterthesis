"use client";

import { CBAchievementCard } from "@/components/CBAchievementCard/CBAchievementCard";
import { CBAchievementCardProps } from "@/components/CBAchievementCard/CBAchievementCardInterfaces";
import { useAchievementsProgress } from "@/helpers/useAchievementsProgress";
import Grid from "@mui/material/Unstable_Grid2";

export default function Achievements() {
  const achievementsProgress = useAchievementsProgress();

  const [achievedAchievements, unachievedAchievements] =
    achievementsProgress.reduce(
      (acc, achievement) => {
        if (achievement.progressValue >= achievement.progressGoal) {
          acc[0].push(achievement);
        } else {
          acc[1].push(achievement);
        }
        return acc;
      },
      [[], []] as [CBAchievementCardProps[], CBAchievementCardProps[]],
    );

  const sortedAchievementCardsData = [
    ...achievedAchievements,
    ...unachievedAchievements,
  ];

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        overflowY: "auto",
      }}
    >
      {sortedAchievementCardsData.map((achievement) => (
        <Grid key={achievement.title} xs={12} lg={6}>
          <CBAchievementCard {...achievement} />
        </Grid>
      ))}
    </Grid>
  );
}

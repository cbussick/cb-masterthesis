"use client";

import { levels } from "@/data/gamification";
import { useUser } from "@/firebase-client/useUser";
import { CBRoute } from "@/helpers/routes";
import { calculateHoursAndMinutesAndSeconds } from "@/helpers/time-tracking/calculateHoursAndMinutesAndSeconds";
import { getThisWeekTimes } from "@/helpers/time-tracking/getThisWeekTimes";
import { useAchievementsProgress } from "@/helpers/useAchievementsProgress";
import { Card, Stack, Typography } from "@mui/material";
import { CBAchievementCardProps } from "../CBAchievementCard/CBAchievementCardInterfaces";
import { CBDateCalendar } from "../CBDateCalendar/CBDateCalendar";
import { CBEmoji } from "../CBEmoji/CBEmoji";
import { CBLink } from "../CBLink/CBLink";
import { CBProgressCard } from "../CBProgressCard/CBProgressCard";
import { CBTrackedTimeGraph } from "../CBTrackedTimeGraph/CBTrackedTimeGraph";
import { CBUserActionsBar } from "../CBUserActionsBar/CBUserActionsBar";
import { CBWelcomeBanner } from "../CBWelcomeBanner/CBWelcomeBanner";

export const CBDashboardStudent = (): JSX.Element => {
  const { customData } = useUser();
  const achievementsProgress = useAchievementsProgress();

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
    hours === 0
      ? ""
      : // eslint-disable-next-line no-nested-ternary
        `${hours} ${hours === 1 ? "Stunde" : "Stunden"}${minutes === 0 ? (seconds === 0 ? "" : " und") : seconds === 0 ? " und" : ", "}`;
  const minutesStringPart =
    minutes === 0
      ? ""
      : `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}${seconds === 0 ? "" : " und"}`;
  const secondsStringPart =
    seconds === 0 ? "" : `${seconds} ${seconds === 1 ? "Sekunde" : "Sekunden"}`;

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

  const ctaAchievement =
    unachievedAchievements.length > 0
      ? unachievedAchievements[0]
      : achievedAchievements[0];

  return (
    <Stack spacing={2} sx={{ overflowY: "hidden", flex: 1 }}>
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
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Stack spacing={2}>
              <Typography
                variant="h4"
                sx={{ fontWeight: (t) => t.typography.fontWeightBold }}
              >
                Deine Punkte:
              </Typography>

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
                format="percent"
              />
            </Stack>

            <Stack spacing={2}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: (t) => t.typography.fontWeightBold }}
                >
                  Deine Achievements:
                </Typography>

                <Typography variant="body2">
                  <CBLink href={CBRoute.Achievements}>
                    Alle Achievements ansehen
                  </CBLink>
                </Typography>
              </Stack>

              <CBProgressCard
                image={ctaAchievement.image}
                title={ctaAchievement.title}
                subTitle={ctaAchievement.subTitle}
                progressValue={ctaAchievement.progressValue}
                maxValue={ctaAchievement.progressGoal}
                format="fraction"
              />
            </Stack>
          </Stack>

          <CBDateCalendar />
        </Stack>

        <Stack spacing={2} sx={{ flex: 1 }}>
          {hours === 0 && minutes === 0 && seconds === 0 ? (
            <Stack direction="row" spacing={1}>
              <Typography>
                Du hast in dieser Woche noch nicht gelernt. Viel Erfolg!
              </Typography>

              <CBEmoji emoji="💪" />
            </Stack>
          ) : (
            <Typography
              variant="h4"
              sx={{ fontWeight: (t) => t.typography.fontWeightBold }}
            >
              {`Du hast in dieser Woche insgesamt ${hoursStringPart} ${minutesStringPart} ${secondsStringPart} lang gelernt:`}
            </Typography>
          )}

          <Card sx={{ flex: 1, p: 4, minHeight: 180 }}>
            <CBTrackedTimeGraph thisWeekTimes={thisWeekTimes} />
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

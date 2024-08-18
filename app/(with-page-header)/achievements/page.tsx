"use client";

import { CBAchievementCard } from "@/components/CBAchievementCard/CBAchievementCard";
import { CBAchievementCardProps } from "@/components/CBAchievementCard/CBAchievementCardInterfaces";
import { achievements, CBAchievement } from "@/data/achievements";
import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic, topics } from "@/data/topics";
import { TopicWorldProgress } from "@/firebase-client/TopicWorldProgressConverter";
import { getUserTopicWorldProgress } from "@/firebase-client/getUserTopicWorldProgress";
import { useUser } from "@/firebase-client/useUser";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";

const isTopicCompleted = (
  topic: CBTopic,
  topicWorldProgress: TopicWorldProgress,
) => {
  const topicsAsArray = Object.values(topicWorldTopics);
  const topicData = topicsAsArray.find(
    (t) => t.topicData.name === topics[topic].name,
  );

  const userTopicProgress = topicWorldProgress.topics[topic];

  const userUnits =
    userTopicProgress && Object.entries(userTopicProgress?.units);

  const topicIsCompleted = topicData?.units.every((unit) => {
    const userUnitProgress = userUnits?.find((userUnit) => {
      return userUnit[0] === unit.id;
    });
    return unit.exercises.every((exercise) => {
      return (
        userUnitProgress &&
        userUnitProgress[1].completedExercises.includes(exercise.id)
      );
    });
  });
  return topicIsCompleted;
};

const makeAchievementData = (
  achievement: CBAchievement,
): Omit<CBAchievementCardProps, "progressValue"> => {
  return {
    title: achievement.name,
    subTitle: achievement.description,
    image: { src: achievement.img.src, alt: achievement.img.alt },
    progressGoal: achievement.progressGoal,
  };
};

export default function Achievements() {
  const { customData, user } = useUser();

  const solvedExercisesCount = customData.solvedExercises;
  const completedExamCount = customData.completedExams;
  const unlockedGlossaryEntries = customData.unlockedGlossaryEntryIDs.length;

  const [topicWorldProgress, setTopicWorldProgress] =
    useState<TopicWorldProgress>();

  useEffect(() => {
    getUserTopicWorldProgress(user.uid).then((progress) => {
      setTopicWorldProgress(progress);
    });
  }, [user.uid]);

  const achievementCardsData: CBAchievementCardProps[] = [
    // Themenwelt
    {
      ...makeAchievementData(achievements[0]),
      progressValue:
        topicWorldProgress &&
        isTopicCompleted(CBTopic.Zelle, topicWorldProgress)
          ? 1
          : 0,
    },
    {
      ...makeAchievementData(achievements[1]),
      progressValue:
        topicWorldProgress &&
        isTopicCompleted(CBTopic.MitoseMeiose, topicWorldProgress)
          ? 1
          : 0,
    },
    {
      ...makeAchievementData(achievements[2]),
      progressValue:
        topicWorldProgress &&
        isTopicCompleted(CBTopic.AufbauDNA, topicWorldProgress)
          ? 1
          : 0,
    },
    // Freie Übungen
    {
      ...makeAchievementData(achievements[3]),
      progressValue: solvedExercisesCount,
    },
    {
      ...makeAchievementData(achievements[4]),
      progressValue: solvedExercisesCount,
    },
    {
      ...makeAchievementData(achievements[5]),
      progressValue: solvedExercisesCount,
    },
    {
      ...makeAchievementData(achievements[6]),
      progressValue: solvedExercisesCount,
    },
    // Prüfungssimulator
    {
      ...makeAchievementData(achievements[7]),
      progressValue: completedExamCount,
    },
    {
      ...makeAchievementData(achievements[8]),
      progressValue: completedExamCount,
    },
    {
      ...makeAchievementData(achievements[9]),
      progressValue: completedExamCount,
    },
    // Glossar
    {
      ...makeAchievementData(achievements[10]),
      progressValue: unlockedGlossaryEntries,
    },
  ];

  const achievedAchievements = achievementCardsData.filter(
    (achievement) => achievement.progressValue >= achievement.progressGoal,
  );

  const unachievedAchievements = achievementCardsData.filter(
    (achievement) => achievement.progressValue < achievement.progressGoal,
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

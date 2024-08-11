"use client";

import { CBAchievementCard } from "@/components/CBAchievementCard/CBAchievementCard";
import { CBAchievementCardProps } from "@/components/CBAchievementCard/CBAchievementCardInterfaces";
import { achievements } from "@/data/achievements";
import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic, topics } from "@/data/topics";
import { TopicWorldProgress } from "@/firebase/client/TopicWorldProgressConverter";
import { getUserTopicWorldProgress } from "@/firebase/client/getUserTopicWorldProgress";
import { useUser } from "@/firebase/client/useUser";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";

export default function Achievements() {
  const user = useUser();

  const solvedExercisesCount = user?.customData.solvedExercises || 0;
  const completedExamCount = user?.customData.completedExams || 0;
  const unlockedGlossaryEntries =
    user?.customData.unlockedGlossaryEntryIDs.length || 0;

  const [topicWorldProgress, setTopicWorldProgress] =
    useState<TopicWorldProgress>();

  useEffect(() => {
    if (user?.user) {
      getUserTopicWorldProgress(user.user.uid).then((progress) => {
        setTopicWorldProgress(progress);
      });
    }
  }, [user?.user]);

  const isTopicCompleted = (topic: CBTopic) => {
    const topicsAsArray = Object.values(topicWorldTopics);
    const topicData = topicsAsArray.find(
      (t) => t.topicData.name === topics[topic].name,
    );

    const userTopicProgress = topicWorldProgress?.topics[topic];

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

  const achievementCardsData: CBAchievementCardProps[] = [
    // Themenwelt
    {
      title: achievements[0].name,
      subTitle: achievements[0].description,
      image: { src: achievements[0].img.src, alt: achievements[0].img.alt },
      progressGoal: achievements[0].progressGoal,
      progressValue: isTopicCompleted(CBTopic.Zelle) ? 1 : 0,
    },
    {
      title: achievements[1].name,
      subTitle: achievements[1].description,
      image: { src: achievements[1].img.src, alt: achievements[1].img.alt },
      progressGoal: achievements[1].progressGoal,
      progressValue: isTopicCompleted(CBTopic.MitoseMeiose) ? 1 : 0,
    },
    {
      title: achievements[2].name,
      subTitle: achievements[2].description,
      image: { src: achievements[2].img.src, alt: achievements[2].img.alt },
      progressGoal: achievements[2].progressGoal,
      progressValue: isTopicCompleted(CBTopic.AufbauDNA) ? 1 : 0,
    },
    // Freie Übungen
    {
      title: achievements[3].name,
      subTitle: achievements[3].description,
      image: { src: achievements[3].img.src, alt: achievements[3].img.alt },
      progressGoal: achievements[3].progressGoal,
      progressValue: solvedExercisesCount,
    },
    {
      title: achievements[4].name,
      subTitle: achievements[4].description,
      image: { src: achievements[4].img.src, alt: achievements[4].img.alt },
      progressGoal: achievements[4].progressGoal,
      progressValue: solvedExercisesCount,
    },
    {
      title: achievements[5].name,
      subTitle: achievements[5].description,
      image: { src: achievements[5].img.src, alt: achievements[5].img.alt },
      progressGoal: achievements[5].progressGoal,
      progressValue: solvedExercisesCount,
    },
    {
      title: achievements[6].name,
      subTitle: achievements[6].description,
      image: { src: achievements[6].img.src, alt: achievements[6].img.alt },
      progressGoal: achievements[6].progressGoal,
      progressValue: solvedExercisesCount,
    },
    // Prüfungssimulator
    {
      title: achievements[7].name,
      subTitle: achievements[7].description,
      image: { src: achievements[7].img.src, alt: achievements[7].img.alt },
      progressGoal: achievements[7].progressGoal,
      progressValue: completedExamCount,
    },
    {
      title: achievements[8].name,
      subTitle: achievements[8].description,
      image: { src: achievements[8].img.src, alt: achievements[8].img.alt },
      progressGoal: achievements[8].progressGoal,
      progressValue: completedExamCount,
    },
    {
      title: achievements[9].name,
      subTitle: achievements[9].description,
      image: { src: achievements[9].img.src, alt: achievements[9].img.alt },
      progressGoal: achievements[9].progressGoal,
      progressValue: completedExamCount,
    },
    // Glossar
    {
      title: achievements[10].name,
      subTitle: achievements[10].description,
      image: { src: achievements[10].img.src, alt: achievements[10].img.alt },
      progressGoal: achievements[10].progressGoal,
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

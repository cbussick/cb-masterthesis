import { CBAchievementCardProps } from "@/components/CBAchievementCard/CBAchievementCardInterfaces";
import { achievements, CBAchievement } from "@/data/achievements";
import { CBTopic } from "@/data/topics";
import { getUserTopicWorldProgress } from "@/firebase-client/getUserTopicWorldProgress";
import { TopicWorldProgress } from "@/firebase-client/TopicWorldProgressConverter";
import { useUser } from "@/firebase-client/useUser";
import { useEffect, useState } from "react";
import { isTopicCompleted } from "./topic-world/isTopicCompleted";

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

export const useAchievementsProgress = () => {
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
    // Pruefungssimulator
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

  return achievementCardsData;
};

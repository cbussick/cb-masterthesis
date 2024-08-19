import { CBAchievementCardProps } from "@/components/CBAchievementCard/CBAchievementCardInterfaces";
import { achievements, CBAchievement } from "@/data/achievements";
import { CBTopic } from "@/data/topics";
import { useUser } from "@/firebase-client/useUser";
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
  const { customData, topicWorldProgress } = useUser();

  const solvedExercisesCount = customData.solvedExercises;
  const completedExamCount = customData.completedExams;
  const unlockedGlossaryEntries = customData.unlockedGlossaryEntryIDs.length;

  const achievementCardsData: CBAchievementCardProps[] = [
    // Themenwelt
    {
      ...makeAchievementData(achievements[0]),
      progressValue: isTopicCompleted(CBTopic.Zelle, topicWorldProgress)
        ? 1
        : 0,
    },
    {
      ...makeAchievementData(achievements[1]),
      progressValue: isTopicCompleted(CBTopic.MitoseMeiose, topicWorldProgress)
        ? 1
        : 0,
    },
    {
      ...makeAchievementData(achievements[2]),
      progressValue: isTopicCompleted(CBTopic.AufbauDNA, topicWorldProgress)
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

import { CBTopicWorldUnit, topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { TopicWorldProgress } from "@/firebase/TopicWorldProgressConverter";

export const isUnitUnlocked = (
  topic: CBTopic,
  unit: CBTopicWorldUnit,
  topicWorldProgress: TopicWorldProgress,
) => {
  const topicData = topicWorldTopics[topic];

  const index = topicData.units.findIndex((t) => {
    return t.id === unit.id;
  });

  const previousUnitId =
    index === 0 ? undefined : topicData.units[index - 1].id;

  const generalPreviousUnitData = topicData.units.find(
    (u) => u.id === previousUnitId,
  );

  const previousUnitCompletedExercises =
    previousUnitId &&
    topicWorldProgress?.topics[topic]?.units[previousUnitId]?.completedExercises
      ?.length;

  const isPreviousUnitCompleted =
    previousUnitCompletedExercises ===
    generalPreviousUnitData?.exercises.length;

  const isUnlocked = index === 0 || isPreviousUnitCompleted;

  return isUnlocked;
};

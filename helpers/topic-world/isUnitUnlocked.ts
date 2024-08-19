import { CBTopicWorldUnit, topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { CBTopicWorldProgress } from "@/firebase-client/TopicWorldProgressConverter";
import { isUnitCompleted } from "./isUnitCompleted";

export const isUnitUnlocked = (
  topic: CBTopic,
  unit: CBTopicWorldUnit,
  topicWorldProgress: CBTopicWorldProgress,
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

  const isPreviousUnitCompleted =
    generalPreviousUnitData &&
    isUnitCompleted(topic, generalPreviousUnitData, topicWorldProgress);

  const isUnlocked = index === 0 || isPreviousUnitCompleted;

  return isUnlocked;
};

import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { TopicWorldProgress } from "@/firebase/client/TopicWorldProgressConverter";
import { getEnumRecordKeyByValue } from "../getEnumRecordKeyByValue";

export const isTopicUnlocked = (
  topic: CBTopic,
  topicWorldProgress: TopicWorldProgress,
) => {
  const topicsAsArray = Object.values(topicWorldTopics);
  const topicData = topicWorldTopics[topic];

  const index = topicsAsArray.findIndex((t) => {
    return t.topicData.name === topicData.topicData.name;
  });

  const previousTopicGeneralData = topicsAsArray[index - 1];

  const previousTopicId =
    index === 0
      ? undefined
      : getEnumRecordKeyByValue(topicWorldTopics, previousTopicGeneralData);

  const isPreviousTopicCompleted =
    previousTopicId &&
    previousTopicGeneralData?.units?.length > 0 &&
    previousTopicGeneralData.units.every((unit) => {
      const userUnitProgress =
        topicWorldProgress.topics[previousTopicId]?.units[unit.id];

      return (
        unit.exercises.length > 0 &&
        unit.exercises.every((exercise) => {
          return userUnitProgress?.completedExercises.includes(exercise.id);
        })
      );
    });

  const isUnlocked = index === 0 || isPreviousTopicCompleted;

  return isUnlocked;
};

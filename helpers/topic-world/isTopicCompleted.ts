import { CBTopic } from "@/data/topics";
import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopicWorldProgress } from "@/firebase-client/TopicWorldProgressConverter";

export const isTopicCompleted = (
  topic: CBTopic,
  topicWorldProgress: CBTopicWorldProgress,
) => {
  const userTopicProgress = topicWorldProgress.topics[topic];

  if (userTopicProgress) {
    const topicData = topicWorldTopics[topic];

    const userUnits = Object.entries(userTopicProgress.units);

    const isCompleted = topicData?.units.every((unit) => {
      const userUnitProgress = userUnits?.find((userUnit) => {
        return userUnit[0] === unit.id;
      });
      if (userUnitProgress) {
        return unit.exercises.every((exercise) => {
          return userUnitProgress[1].completedExercises.includes(exercise.id);
        });
      }
      return false;
    });
    return isCompleted;
  }
  return false;
};

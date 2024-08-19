import { CBTopicWorldUnit, topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { CBTopicWorldProgress } from "@/firebase-client/TopicWorldProgressConverter";

export const isUnitCompleted = (
  topic: CBTopic,
  unit: CBTopicWorldUnit,
  topicWorldProgress: CBTopicWorldProgress,
) => {
  const topicData = topicWorldTopics[topic];

  const generalUnitData = topicData.units.find((u) => u.id === unit.id);

  const unitCompletedExercises =
    topicWorldProgress.topics[topic]?.units[unit.id]?.completedExercises || [];

  const isCompleted =
    unitCompletedExercises.length > 0 &&
    generalUnitData?.exercises.every((exercise) =>
      unitCompletedExercises.some((e) => e === exercise.id),
    );

  return isCompleted;
};

import { CBTopicWorldUnit, topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { TopicWorldProgress } from "@/firebase-client/TopicWorldProgressConverter";

export const isUnitCompleted = (
  topic: CBTopic,
  unit: CBTopicWorldUnit,
  topicWorldProgress: TopicWorldProgress,
) => {
  const topicData = topicWorldTopics[topic];

  const generalUnitData = topicData.units.find((u) => u.id === unit.id);

  const unitCompletedExercises =
    topicWorldProgress.topics[topic]?.units[unit.id]?.completedExercises || [];

  const isCompleted =
    unitCompletedExercises.length > 0 &&
    unitCompletedExercises.every((unitId) =>
      generalUnitData?.exercises.some((e) => e.id === unitId),
    );

  return isCompleted;
};

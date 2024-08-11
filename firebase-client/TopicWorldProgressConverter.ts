import {
  FirestoreDataConverter,
  PartialWithFieldValue,
} from "firebase/firestore";

export interface TopicWorldProgress {
  topics: {
    [topicId: string]: {
      units: {
        [unitId: string]: {
          completedExercises: string[];
        };
      };
    };
  };
}

export const topicWorldProgressConverter: FirestoreDataConverter<
  TopicWorldProgress,
  PartialWithFieldValue<TopicWorldProgress>
> = {
  toFirestore(
    topicWorldProgress: PartialWithFieldValue<TopicWorldProgress>,
  ): PartialWithFieldValue<TopicWorldProgress> {
    return {
      topics: topicWorldProgress.topics,
    };
  },
  fromFirestore(snapshot, options): TopicWorldProgress {
    const data = snapshot.data(options);
    return { topics: data.topics };
  },
};

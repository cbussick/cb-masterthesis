import {
  FirestoreDataConverter,
  PartialWithFieldValue,
} from "firebase/firestore";

export interface CBTopicWorldProgress {
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
  CBTopicWorldProgress,
  PartialWithFieldValue<CBTopicWorldProgress>
> = {
  toFirestore(
    topicWorldProgress: PartialWithFieldValue<CBTopicWorldProgress>,
  ): PartialWithFieldValue<CBTopicWorldProgress> {
    return {
      topics: topicWorldProgress.topics,
    };
  },
  fromFirestore(snapshot, options): CBTopicWorldProgress {
    const data = snapshot.data(options);
    return { topics: data.topics };
  },
};

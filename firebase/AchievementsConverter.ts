import {
  FirestoreDataConverter,
  PartialWithFieldValue,
} from "firebase/firestore";

export interface MPMIAchievementData {
  name: string;
  description: string;
  progressGoal: number;
  achievementType?: string;
  img: string;
}

export const achievementConverter: FirestoreDataConverter<
  MPMIAchievementData,
  PartialWithFieldValue<MPMIAchievementData>
> = {
  toFirestore(
    achievementData: PartialWithFieldValue<MPMIAchievementData>,
  ): PartialWithFieldValue<MPMIAchievementData> {
    return {
      name: achievementData.name,
      description: achievementData.description,
      progressGoal: achievementData.progressGoal,
      achievementType: achievementData.achievementType,
      img: achievementData.img,
    };
  },
  fromFirestore(snapshot, options): MPMIAchievementData {
    const data = snapshot.data(options);
    return {
      name: data.name,
      description: data.description,
      progressGoal: data.progressGoal,
      achievementType: data.achievementType,
      img: data.img,
    };
  },
};

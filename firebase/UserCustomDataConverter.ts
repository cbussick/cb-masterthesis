import { MPMIExerciseType } from "@/data/exercises/MPMIExerciseType";
import { MPMITopic } from "@/data/topics";
import {
  FirestoreDataConverter,
  PartialWithFieldValue,
} from "firebase/firestore";
import { MPMIUserRole } from "./userRole";

export interface MPMIMistakeExercise {
  id: string;
  topic: MPMITopic;
  type: MPMIExerciseType;
}

export interface MPMITrackedTime {
  date: string;
  time: number;
}

export interface MPMIUserCustomData {
  firstName: string;
  lastName: string;
  username: string;
  points: number;
  solvedExercises: number;
  completedExams: number;
  role: MPMIUserRole;
  unlockedGlossaryEntryIDs: string[];
  profilePicture: string;
  mistakeExercises: MPMIMistakeExercise[];
  trackedTime: MPMITrackedTime[];
}

export const userCustomDataConverter: FirestoreDataConverter<
  MPMIUserCustomData,
  PartialWithFieldValue<MPMIUserCustomData>
> = {
  toFirestore(
    userCustomData: PartialWithFieldValue<MPMIUserCustomData>,
  ): PartialWithFieldValue<MPMIUserCustomData> {
    return {
      firstName: userCustomData.firstName,
      lastName: userCustomData.lastName,
      username: userCustomData.username,
      points: userCustomData.points,
      solvedExercises: userCustomData.solvedExercises,
      completedExams: userCustomData.completedExams,
      role: userCustomData.role,
      unlockedGlossaryEntryIDs: userCustomData.unlockedGlossaryEntryIDs,
      profilePicture: userCustomData.profilePicture,
      mistakeExercises: userCustomData.mistakeExercises,
      trackedTime: userCustomData.trackedTime,
    };
  },
  fromFirestore(snapshot, options): MPMIUserCustomData {
    const data = snapshot.data(options);
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      points: data.points,
      solvedExercises: data.solvedExercises,
      completedExams: data.completedExams,
      role: data.role,
      unlockedGlossaryEntryIDs: data.unlockedGlossaryEntryIDs,
      profilePicture: data.profilePicture,
      mistakeExercises: data.mistakeExercises,
      trackedTime: data.trackedTime,
    };
  },
};

import {
  FirestoreDataConverter,
  PartialWithFieldValue,
} from "firebase/firestore";
import { CBUserRole } from "./userRole";

export interface CBTrackedTime {
  date: string;
  time: number;
}

export interface CBUserCustomData {
  firstName: string;
  lastName: string;
  username: string;
  points: number;
  solvedExercises: number;
  completedExams: number;
  role: CBUserRole;
  unlockedGlossaryEntryIDs: string[];
  profilePicture: string;
  trackedTime: CBTrackedTime[];
}

export const userCustomDataConverter: FirestoreDataConverter<
  CBUserCustomData,
  PartialWithFieldValue<CBUserCustomData>
> = {
  toFirestore(
    userCustomData: PartialWithFieldValue<CBUserCustomData>,
  ): PartialWithFieldValue<CBUserCustomData> {
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
      trackedTime: userCustomData.trackedTime,
    };
  },
  fromFirestore(snapshot, options): CBUserCustomData {
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
      trackedTime: data.trackedTime,
    };
  },
};

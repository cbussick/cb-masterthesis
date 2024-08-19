import { getUserCustomDataDocumentReference } from "@/helpers/getUserCustomDataDocumentReference";
import { setDoc } from "firebase/firestore";
import { CBUserRole } from "./userRole";

export const initializeCustomUserFields = async (
  uid: string,
  firstName: string,
  lastName: string,
  username: string,
  role: CBUserRole,
  unlockedGlossaryEntryIDs: string[],
  profilePicture: string,
) => {
  try {
    const documentReference = getUserCustomDataDocumentReference(uid);

    setDoc(documentReference, {
      firstName,
      lastName,
      username,
      points: 0,
      solvedExercises: 0,
      completedExams: 0,
      role,
      unlockedGlossaryEntryIDs,
      profilePicture,
      mistakeExercises: [],
      trackedTime: [],
    });
  } catch (error) {
    // Todo: Handle error
  }
};

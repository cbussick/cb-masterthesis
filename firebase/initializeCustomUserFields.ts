import { doc, setDoc } from "firebase/firestore";
import { userCustomDataConverter } from "./UserCustomDataConverter";
import { firestore } from "./firebase";
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
    const documentReference = doc(firestore, `users/${uid}`).withConverter(
      userCustomDataConverter,
    );

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

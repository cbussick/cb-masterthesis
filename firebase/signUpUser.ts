import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { initializeCustomUserFields } from "./initializeCustomUserFields";
import { initializeTopicWorldProgress } from "./initializeTopicWorldProgress";
import { MPMIUserRole } from "./userRole";

export const signUpUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  name: string,
  role: MPMIUserRole,
  unlockedGlossaryEntryIDs: string[],
  profilePicture: string,
) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      // User is now signed in after registering
      const { user } = userCredential;

      // Initialize document for custom user fields in database
      initializeCustomUserFields(
        user.uid,
        firstName,
        lastName,
        name,
        role,
        unlockedGlossaryEntryIDs,
        profilePicture,
      );

      // Initialize document for topic world progress in database
      initializeTopicWorldProgress(user.uid);
    },
  );
};

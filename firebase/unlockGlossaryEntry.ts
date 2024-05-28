import { doc, getDoc, updateDoc } from "firebase/firestore";
import { userCustomDataConverter } from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const unlockGlossaryEntry = async (
  uid: string,
  glossaryEntry: string,
) => {
  try {
    const documentReference = doc(firestore, `users/${uid}`).withConverter(
      userCustomDataConverter,
    );

    const documentSnapshot = await getDoc(documentReference);
    updateDoc(documentReference, {
      unlockedGlossaryEntryIDs: documentSnapshot.exists()
        ? [...documentSnapshot.data().unlockedGlossaryEntryIDs, glossaryEntry]
        : [glossaryEntry],
    });
  } catch (error) {
    // Todo: Handle error
  }
};

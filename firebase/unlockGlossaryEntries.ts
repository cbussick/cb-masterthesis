import { doc, getDoc, updateDoc } from "firebase/firestore";
import { userCustomDataConverter } from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const unlockGlossaryEntries = async (
  uid: string,
  glossaryEntries: string[],
) => {
  try {
    const documentReference = doc(firestore, `users/${uid}`).withConverter(
      userCustomDataConverter,
    );

    const documentSnapshot = await getDoc(documentReference);
    updateDoc(documentReference, {
      unlockedGlossaryEntryIDs: documentSnapshot.exists()
        ? [
            ...documentSnapshot.data().unlockedGlossaryEntryIDs,
            ...glossaryEntries,
          ]
        : [...glossaryEntries],
    });
  } catch (error) {
    // Todo: Handle error
  }
};

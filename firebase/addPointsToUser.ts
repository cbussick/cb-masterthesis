import { doc, getDoc, updateDoc } from "firebase/firestore";
import { userCustomDataConverter } from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const addPointsToUser = async (uid: string, points: number) => {
  try {
    const documentReference = doc(firestore, `users/${uid}`).withConverter(
      userCustomDataConverter,
    );

    const documentSnapshot = await getDoc(documentReference);

    updateDoc(documentReference, {
      // Need to be explicitly converted to numbers, because at runtime they are an object and a string
      points: documentSnapshot.exists()
        ? Number(documentSnapshot.data().points) + Number(points)
        : Number(points),
    });
  } catch (error) {
    // Todo: Handle error
  }
};

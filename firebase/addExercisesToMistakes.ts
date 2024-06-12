import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  CBMistakeExercise,
  userCustomDataConverter,
} from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const addExercisesToMistakes = async (
  uid: string,
  exercises: CBMistakeExercise[],
) => {
  try {
    const documentReference = doc(firestore, `users/${uid}`).withConverter(
      userCustomDataConverter,
    );

    const documentSnapshot = await getDoc(documentReference);
    updateDoc(documentReference, {
      mistakeExercises: documentSnapshot.exists()
        ? [...documentSnapshot.data().mistakeExercises, ...exercises]
        : [...exercises],
    });
  } catch (error) {
    // Todo: Handle error
  }
};

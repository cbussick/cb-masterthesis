import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  MPMIMistakeExercise,
  userCustomDataConverter,
} from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const removeExercisesFromMistakes = async (
  uid: string,
  exercises: MPMIMistakeExercise[],
) => {
  try {
    const documentReference = doc(firestore, `users/${uid}`).withConverter(
      userCustomDataConverter,
    );

    const documentSnapshot = await getDoc(documentReference);

    const snapshotExists = documentSnapshot.exists();
    if (snapshotExists) {
      const prevMistakeExercises = documentSnapshot.data().mistakeExercises;

      const newMistakeExercises = prevMistakeExercises.filter(
        (e) =>
          exercises.find((ex) => ex.id === e.id && ex.topic === e.topic) ===
          undefined,
      );
      updateDoc(documentReference, { mistakeExercises: newMistakeExercises });
    }
  } catch (error) {
    // Todo: Handle error
  }
};

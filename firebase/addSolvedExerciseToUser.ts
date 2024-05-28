import { doc, getDoc, updateDoc } from "firebase/firestore";
import { userCustomDataConverter } from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const addSolvedExerciseToUser = async (
  uid: string,
  solvedExercisesAmount: number,
) => {
  try {
    const documentReference = doc(firestore, `users/${uid}`).withConverter(
      userCustomDataConverter,
    );

    const documentSnapshot = await getDoc(documentReference);

    updateDoc(documentReference, {
      // Need to be explicitly converted to numbers, because at runtime they are an object and a string
      solvedExercises: documentSnapshot.exists()
        ? Number(documentSnapshot.data().solvedExercises) +
          Number(solvedExercisesAmount)
        : Number(solvedExercisesAmount),
    });
  } catch (error) {
    //
  }
};

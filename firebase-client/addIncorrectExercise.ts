import { getIncorrectExerciseCollectionReference } from "@/helpers/getIncorrectExerciseCollectionReference";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import {
  incorrectExercisesCollectionName,
  usersCollectionName,
} from "./firebaseCollectionNames";
import { CBIncorrectExercise } from "./incorrectExercisesConverter";

export const addIncorrectExercise = async (
  uid: string,
  exercise: CBIncorrectExercise,
) => {
  try {
    const collectionReference = getIncorrectExerciseCollectionReference(uid);

    if (collectionReference) {
      setDoc(
        doc(
          firestore,
          `${usersCollectionName}/${uid}/${incorrectExercisesCollectionName}`,
          exercise.id,
        ),
        {
          ...exercise,
        },
      );
    }
  } catch (error) {
    // Todo: Handle error
  }
};

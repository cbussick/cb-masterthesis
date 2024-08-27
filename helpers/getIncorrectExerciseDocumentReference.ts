import { firestore } from "@/firebase-client/firebase";
import {
  incorrectExercisesCollectionName,
  usersCollectionName,
} from "@/firebase-client/firebaseCollectionNames";
import { incorrectExercisesConverter } from "@/firebase-client/incorrectExercisesConverter";
import { doc } from "firebase/firestore";

export const getIncorrectExerciseDocumentReference = (
  uid: string,
  exerciseId: string,
) => {
  return doc(
    firestore,
    `${usersCollectionName}/${uid}/${incorrectExercisesCollectionName}/${exerciseId}`,
  ).withConverter(incorrectExercisesConverter);
};

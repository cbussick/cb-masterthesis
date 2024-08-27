import { firestore } from "@/firebase-client/firebase";
import {
  incorrectExercisesCollectionName,
  usersCollectionName,
} from "@/firebase-client/firebaseCollectionNames";
import { incorrectExercisesConverter } from "@/firebase-client/incorrectExercisesConverter";
import { collection } from "firebase/firestore";

export const getIncorrectExerciseCollectionReference = (uid: string) => {
  return collection(
    firestore,
    `${usersCollectionName}/${uid}/${incorrectExercisesCollectionName}`,
  ).withConverter(incorrectExercisesConverter);
};

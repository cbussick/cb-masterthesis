import { firestore } from "@/firebase-client/firebase";
import { usersCollectionName } from "@/firebase-client/firebaseCollectionNames";
import { userCustomDataConverter } from "@/firebase-client/userCustomDataConverter";
import { doc } from "firebase/firestore";

export const getUserCustomDataDocumentReference = (uid: string) => {
  return doc(firestore, `${usersCollectionName}/${uid}`).withConverter(
    userCustomDataConverter,
  );
};

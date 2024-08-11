import { userCustomDataConverter } from "@/firebase-client/UserCustomDataConverter";
import { firestore } from "@/firebase-client/firebase";
import { doc } from "firebase/firestore";

export const getUserCustomDataDocumentReference = (uid: string) => {
  return doc(firestore, `users/${uid}`).withConverter(userCustomDataConverter);
};

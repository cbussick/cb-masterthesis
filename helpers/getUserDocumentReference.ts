import { userCustomDataConverter } from "@/firebase/UserCustomDataConverter";
import { firestore } from "@/firebase/firebase";
import { doc } from "firebase/firestore";

export const getUserCustomDataDocumentReference = (uid: string) => {
  return doc(firestore, `users/${uid}`).withConverter(userCustomDataConverter);
};

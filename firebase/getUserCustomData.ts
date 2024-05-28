import { doc, getDoc } from "firebase/firestore";
import { userCustomDataConverter } from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const getUserCustomData = async (uid: string) => {
  const documentReference = doc(firestore, `users/${uid}`).withConverter(
    userCustomDataConverter,
  );

  const documentSnapshot = await getDoc(documentReference);

  return documentSnapshot;
};

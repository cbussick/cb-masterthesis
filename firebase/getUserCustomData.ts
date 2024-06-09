import { doc } from "firebase/firestore";
import { userCustomDataConverter } from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const getUserCustomDataReference = async (uid: string) => {
  const documentReference = doc(firestore, `users/${uid}`).withConverter(
    userCustomDataConverter,
  );

  return documentReference;
};

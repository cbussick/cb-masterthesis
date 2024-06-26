import { getUserCustomDataDocumentReference } from "@/helpers/getUserCustomDataDocumentReference";
import { updateDoc } from "firebase/firestore";

export const changeUsername = async (uid: string, username: string) => {
  const documentReference = getUserCustomDataDocumentReference(uid);

  updateDoc(documentReference, {
    username,
  });
};

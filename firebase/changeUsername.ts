import { getUserDocumentReference } from "@/helpers/getUserDocumentReference";
import { updateDoc } from "firebase/firestore";

export const changeUsername = async (uid: string, username: string) => {
  const documentReference = getUserDocumentReference(uid);

  updateDoc(documentReference, {
    username,
  });
};

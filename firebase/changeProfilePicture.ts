import { getUserDocumentReference } from "@/helpers/getUserDocumentReference";
import { updateDoc } from "firebase/firestore";

export const changeProfilePicture = async (
  uid: string,
  profilePicture: string,
) => {
  const documentReference = getUserDocumentReference(uid);

  updateDoc(documentReference, {
    profilePicture,
  });
};

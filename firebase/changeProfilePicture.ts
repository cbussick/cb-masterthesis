import { getUserCustomDataDocumentReference } from "@/helpers/getUserDocumentReference";
import { updateDoc } from "firebase/firestore";

export const changeProfilePicture = async (
  uid: string,
  profilePicture: string,
) => {
  const documentReference = getUserCustomDataDocumentReference(uid);

  updateDoc(documentReference, {
    profilePicture,
  });
};

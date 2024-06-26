import { getUserCustomDataDocumentReference } from "@/helpers/getUserCustomDataDocumentReference";
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

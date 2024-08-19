import { getUserCustomDataDocumentReference } from "@/helpers/getUserCustomDataDocumentReference";
import { updateDoc } from "firebase/firestore";
import { CBUserCustomData } from "./UserCustomDataConverter";

export const updateUser = async (
  uid: string,
  data: Partial<CBUserCustomData>,
) => {
  try {
    const documentReference = getUserCustomDataDocumentReference(uid);

    updateDoc(documentReference, data);
  } catch (error) {
    // Handle error
  }
};

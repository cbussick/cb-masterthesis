import { getUserCustomDataDocumentReference } from "@/helpers/getUserCustomDataDocumentReference";
import { getDoc, updateDoc } from "firebase/firestore";

export const addCompletedExamsToUser = async (
  uid: string,
  completedExamsAmount: number,
) => {
  const documentReference = getUserCustomDataDocumentReference(uid);

  const documentSnapshot = await getDoc(documentReference);

  updateDoc(documentReference, {
    // Need to be explicitly converted to numbers, because at runtime they are an object and a string
    completedExams: documentSnapshot.exists()
      ? Number(documentSnapshot.data().completedExams) +
        Number(completedExamsAmount)
      : Number(completedExamsAmount),
  });
};

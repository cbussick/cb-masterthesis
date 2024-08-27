import { getIncorrectExerciseDocumentReference } from "@/helpers/getIncorrectExerciseDocumentReference";
import { deleteDoc } from "firebase/firestore";

export const removeIncorrectExercise = async (
  uid: string,
  exerciseId: string,
) => {
  try {
    const documentReference = getIncorrectExerciseDocumentReference(
      uid,
      exerciseId,
    );

    if (documentReference) {
      deleteDoc(documentReference);
    }
  } catch (error) {
    // Todo: Handle error
  }
};

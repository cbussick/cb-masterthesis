import { getTopicWorldDocumentReference } from "@/helpers/getTopicWorldDocumentReference";
import { setDoc } from "firebase/firestore";

export const initializeTopicWorldProgress = async (uid: string) => {
  try {
    const documentReference = getTopicWorldDocumentReference(uid);

    await setDoc(documentReference, { topics: {} });
  } catch (error) {
    // Todo: Handle error
  }
};

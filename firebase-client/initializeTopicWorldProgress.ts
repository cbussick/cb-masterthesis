import { getTopicWorldProgressDocumentReference } from "@/helpers/getTopicWorldProgressDocumentReference";
import { setDoc } from "firebase/firestore";

export const initializeTopicWorldProgress = async (uid: string) => {
  try {
    const documentReference = getTopicWorldProgressDocumentReference(uid);

    await setDoc(documentReference, { topics: {} });
  } catch (error) {
    // Todo: Handle error
  }
};

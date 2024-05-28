import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const initializeTopicWorldProgress = async (uid: string) => {
  try {
    const documentReference = doc(firestore, `topicWorldProgress/${uid}`);

    await setDoc(documentReference, { topics: {} });
  } catch (error) {
    // Todo: Handle error
  }
};

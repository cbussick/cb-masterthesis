import { doc, getDoc } from "firebase/firestore";
import { TopicWorldProgress } from "./TopicWorldProgressConverter";
import { firestore } from "./firebase";

export const getUserTopicWorldProgress = async (
  uid: string,
): Promise<TopicWorldProgress | undefined> => {
  try {
    const documentReference = doc(firestore, `topicWorldProgress/${uid}`);
    const documentSnapshot = await getDoc(documentReference);

    if (documentSnapshot.exists()) {
      return documentSnapshot.data() as TopicWorldProgress;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

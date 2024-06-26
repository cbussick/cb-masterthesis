import { getTopicWorldDocumentReference } from "@/helpers/getTopicWorldDocumentReference";
import { getDoc } from "firebase/firestore";
import { TopicWorldProgress } from "./TopicWorldProgressConverter";

export const getUserTopicWorldProgress = async (
  uid: string,
): Promise<TopicWorldProgress | undefined> => {
  try {
    const documentReference = getTopicWorldDocumentReference(uid);
    const documentSnapshot = await getDoc(documentReference);

    if (documentSnapshot.exists()) {
      return documentSnapshot.data() as TopicWorldProgress;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

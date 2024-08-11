import { topicWorldProgressConverter } from "@/firebase/client/TopicWorldProgressConverter";
import { firestore } from "@/firebase/client/firebase";
import { doc } from "firebase/firestore";

export const getTopicWorldDocumentReference = (uid: string) => {
  return doc(firestore, `topicWorldProgress/${uid}`).withConverter(
    topicWorldProgressConverter,
  );
};

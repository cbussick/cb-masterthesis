import { topicWorldProgressConverter } from "@/firebase/TopicWorldProgressConverter";
import { firestore } from "@/firebase/firebase";
import { doc } from "firebase/firestore";

export const getTopicWorldDocumentReference = (uid: string) => {
  return doc(firestore, `topicWorldProgress/${uid}`).withConverter(
    topicWorldProgressConverter,
  );
};

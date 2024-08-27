import { firestore } from "@/firebase-client/firebase";
import { topicWorldProgressCollectionName } from "@/firebase-client/firebaseCollectionNames";
import { topicWorldProgressConverter } from "@/firebase-client/topicWorldProgressConverter";
import { doc } from "firebase/firestore";

export const getTopicWorldProgressDocumentReference = (uid: string) => {
  return doc(
    firestore,
    `${topicWorldProgressCollectionName}/${uid}`,
  ).withConverter(topicWorldProgressConverter);
};

import { getTopicWorldProgressDocumentReference } from "@/helpers/getTopicWorldProgressDocumentReference";
import { arrayUnion, updateDoc } from "firebase/firestore";

export const markExerciseAsCompleted = async (
  uid: string,
  topicId: string,
  unitId: string,
  exerciseId: string,
) => {
  try {
    const documentReference = getTopicWorldProgressDocumentReference(uid);

    const topicPath = `topics.${topicId}.units.${unitId}.completedExercises`;
    await updateDoc(documentReference, {
      [topicPath]: arrayUnion(exerciseId),
    });
  } catch (error) {
    // Todo: Handle error
  }
};

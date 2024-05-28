import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const markExerciseAsCompleted = async (
  uid: string,
  topicId: string,
  unitId: string,
  exerciseId: string,
) => {
  try {
    const documentReference = doc(firestore, `topicWorldProgress/${uid}`);

    const topicPath = `topics.${topicId}.units.${unitId}.completedExercises`;
    await updateDoc(documentReference, {
      [topicPath]: arrayUnion(exerciseId),
    });
  } catch (error) {
    // Todo: Handle error
  }
};

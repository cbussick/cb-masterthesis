import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  CBTrackedTime,
  userCustomDataConverter,
} from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export const addTrackedTimeToUser = async (
  uid: string,
  trackedTime: CBTrackedTime,
) => {
  try {
    const documentReference = doc(firestore, `users/${uid}`).withConverter(
      userCustomDataConverter,
    );

    const documentSnapshot = await getDoc(documentReference);

    const snapshotExists = documentSnapshot.exists();
    if (snapshotExists) {
      const prevTrackedTime = documentSnapshot.data().trackedTime;
      const existingDate = prevTrackedTime.find(
        (t) => t.date === trackedTime.date,
      );

      if (existingDate) {
        const newTime = existingDate.time + trackedTime.time;
        const sameDateIndex = prevTrackedTime.findIndex(
          (t) => t.date === trackedTime.date,
        );

        const newDate = prevTrackedTime;
        newDate[sameDateIndex] = { date: existingDate.date, time: newTime };

        updateDoc(documentReference, { trackedTime: newDate });
      } else {
        const newDate = prevTrackedTime;
        newDate.push(trackedTime);

        updateDoc(documentReference, { trackedTime: newDate });
      }
    }
  } catch (error) {
    // Todo: Handle error
  }
};

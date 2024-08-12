import { firestore } from "firebase-admin";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { auth, logger } from "firebase-functions";

!getApps.length ? initializeApp() : getApp();
const db = firestore();

export const deleteUserData = auth.user().onDelete(async (user) => {
  const { uid } = user;

  logger.info(`User ${uid} deleted.`);

  try {
    // Delete the document in the 'users' collection
    const customDataRef = db.collection("users").doc(uid);
    await customDataRef.delete();
    logger.info(`Deleted custom data for user: ${uid}`);

    // Delete the document in the 'topicWorldProgress' collection
    const topicWorldProgressRef = db.collection("topicWorldProgress").doc(uid);
    await topicWorldProgressRef.delete();
    logger.info(`Deleted topicWorldProgress for user: ${uid}`);
  } catch (error) {
    logger.error(`Error deleting user data for user: ${uid}`, error);
  }
});

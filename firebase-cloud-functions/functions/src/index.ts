import { CloudBillingClient } from "@google-cloud/billing";
import { firestore } from "firebase-admin";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { auth, logger, pubsub } from "firebase-functions";

const PROJECT_ID = "dinas-lab";
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const billing = new CloudBillingClient();

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

exports.stopBilling = pubsub
  .topic("dinas-lab-budget-notifications")
  .onPublish(async (pubsubEvent) => {
    const pubsubData = JSON.parse(
      Buffer.from(pubsubEvent.data, "base64").toString(),
    );

    console.log(
      "A Pub/Sub event happened and triggered this function:",
      pubsubData,
    );

    if (pubsubData.costAmount <= pubsubData.budgetAmount) {
      return `No action necessary. (Current cost: ${pubsubData.costAmount})`;
    }

    if (!PROJECT_ID) {
      return "No project specified";
    }

    const billingEnabled = await _isBillingEnabled(PROJECT_NAME);

    if (billingEnabled) {
      return _disableBillingForProject(PROJECT_NAME);
    } else {
      return "Billing already disabled";
    }
  });

/**
 * Determine whether billing is enabled for a project
 * @param {string} projectName Name of project to check if billing is enabled
 * @return {bool} Whether project has billing enabled or not
 */
const _isBillingEnabled = async (projectName: string) => {
  try {
    const [res] = await billing.getProjectBillingInfo({ name: projectName });
    return res.billingEnabled;
  } catch (e) {
    console.log(
      "Unable to determine if billing is enabled on specified project, assuming billing is enabled.",
    );
    return true;
  }
};

/**
 * Disable billing for a project by removing its billing account
 * @param {string} projectName Name of project disable billing on
 * @return {string} Text containing response from disabling billing
 */
const _disableBillingForProject = async (projectName: string) => {
  // @ts-ignore
  // It works for Google Cloud
  const [res] = await billing.updateProjectBillingInfo({
    name: projectName,
    // @ts-ignore
    // It works for Google Cloud
    resource: { billingAccountName: "" }, // Disables billing
  });
  console.log(
    "WARNING! Billing has been disabled, because the app went over the assigned Google Cloud budget.",
  );
  return `Billing disabled: ${JSON.stringify(res)}`;
};

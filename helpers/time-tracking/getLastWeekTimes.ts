import { CBTrackedTime } from "@/firebase-client/UserCustomDataConverter";
import { dayjsLocalized } from "./dayjsLocalized";

export const getLastWeekTimes = (
  userTimes: CBTrackedTime[],
): CBTrackedTime[] => {
  const today = dayjsLocalized();

  return userTimes.filter((t) => {
    const date = new Date(t.date);
    const dateDifference = today.diff(date, "day");

    if (dateDifference < 7) {
      return true;
    }
    return false;
  });
};

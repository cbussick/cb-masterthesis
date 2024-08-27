import { CBTrackedTime } from "@/firebase-client/userCustomDataConverter";
import { dayjsLocalized } from "./dayjsLocalized";

export const getThisWeekTimes = (
  userTimes: CBTrackedTime[],
): CBTrackedTime[] => {
  const today = dayjsLocalized();

  return userTimes.filter((t) => {
    const date = dayjsLocalized(new Date(t.date));
    const startOfCurrentWeek = today.startOf("week");
    const isInCurrentWeek = date.isAfter(startOfCurrentWeek);

    if (isInCurrentWeek) {
      return true;
    }
    return false;
  });
};

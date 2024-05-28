import { MPMITrackedTime } from "@/firebase/UserCustomDataConverter";
import dayjs from "dayjs";
import { getWeekdayIndex } from "./getWeekdayIndex";

export const getLastWeekTimes = (
  userTimes: MPMITrackedTime[],
): MPMITrackedTime[] => {
  const today = dayjs();
  const todayIndex = getWeekdayIndex(today);

  return userTimes.filter((t) => {
    const date = new Date(t.date);
    const dateDifference = today.diff(date, "day");

    if (dateDifference <= todayIndex) {
      return true;
    }
    return false;
  });
};

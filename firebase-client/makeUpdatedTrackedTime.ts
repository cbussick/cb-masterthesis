import { Dayjs } from "dayjs";
import { CBTrackedTime, CBUserCustomData } from "./userCustomDataConverter";

export const makeUpdatedTrackedTime = (
  beginTime: Dayjs,
  endTime: Dayjs,
  userCustomData: CBUserCustomData,
): CBTrackedTime[] => {
  const formattedDate = endTime.format("YYYY-MM-DD");
  const durationInSeconds = endTime.diff(beginTime, "second");

  const trackedTime: CBTrackedTime = {
    date: formattedDate,
    time: durationInSeconds,
  };

  const prevTrackedTime = userCustomData.trackedTime;
  const newTrackedTime = prevTrackedTime;
  const existingDate = prevTrackedTime.find((t) => t.date === trackedTime.date);

  if (existingDate) {
    const newTime = existingDate.time + trackedTime.time;
    const sameDateIndex = prevTrackedTime.findIndex(
      (t) => t.date === trackedTime.date,
    );

    newTrackedTime[sameDateIndex] = { date: existingDate.date, time: newTime };
  } else {
    newTrackedTime.push(trackedTime);
  }
  return newTrackedTime;
};

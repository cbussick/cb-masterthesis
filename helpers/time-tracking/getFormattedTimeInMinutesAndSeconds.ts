import { dayjsLocalized } from "./dayjsLocalized";

export const getFormattedTimeInMinutesAndSeconds = (
  seconds: number,
): string => {
  return dayjsLocalized.duration(seconds, "second").format("mm:ss");
};

import { Dayjs } from "dayjs";

export const getWeekdayIndex = (date: Dayjs): number => {
  return date.get("day") - 1;
};

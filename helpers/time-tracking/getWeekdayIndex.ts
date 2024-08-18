import { Dayjs } from "dayjs";

export const getWeekdayIndex = (date: Dayjs): number => {
  return date.isoWeekday() - 1;
};

import { CBClassEvent } from "@/data/events";
import { PickersDayProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export interface CBDateCalendarDayProps extends PickersDayProps<Dayjs> {
  events?: CBClassEvent[];
}

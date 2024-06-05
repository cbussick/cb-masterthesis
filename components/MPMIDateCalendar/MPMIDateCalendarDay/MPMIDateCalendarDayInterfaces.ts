import { MPMIClassEvent } from "@/data/events";
import { PickersDayProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export interface MPMIDateCalendarDayProps extends PickersDayProps<Dayjs> {
  events?: MPMIClassEvent[];
}

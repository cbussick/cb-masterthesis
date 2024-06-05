import { MPMIClassEvent } from "@/data/events";
import { PopoverProps } from "@mui/material";

export interface MPMIDateCalendarDayInformationProps {
  id?: string;
  anchorEl: PopoverProps["anchorEl"];
  isOpen: PopoverProps["open"];
  onClose: VoidFunction;
  events: MPMIClassEvent[];
}

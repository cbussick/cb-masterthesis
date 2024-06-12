import { CBClassEvent } from "@/data/events";
import { PopoverProps } from "@mui/material";

export interface CBDateCalendarDayInformationProps {
  id?: string;
  anchorEl: PopoverProps["anchorEl"];
  isOpen: PopoverProps["open"];
  onClose: VoidFunction;
  events: CBClassEvent[];
}

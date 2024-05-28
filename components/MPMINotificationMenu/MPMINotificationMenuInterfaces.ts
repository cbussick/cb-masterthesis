import { PopoverProps } from "@mui/material";

export interface MPMINotificationMenuProps {
  id?: string;
  anchorEl: PopoverProps["anchorEl"];
  isMenuOpen: PopoverProps["open"];
  onClose: VoidFunction;
}

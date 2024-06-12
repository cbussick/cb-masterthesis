import { PopoverProps } from "@mui/material";

export interface CBNotificationMenuProps {
  id?: string;
  anchorEl: PopoverProps["anchorEl"];
  isMenuOpen: PopoverProps["open"];
  onClose: VoidFunction;
}

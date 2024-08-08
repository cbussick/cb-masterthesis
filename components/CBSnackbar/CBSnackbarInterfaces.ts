import { AlertProps, SnackbarProps } from "@mui/material";

export interface CBSnackbarProps {
  isOpen: SnackbarProps["open"];
  onClose: VoidFunction;
  action?: SnackbarProps["action"];
  severity?: AlertProps["severity"];
  title?: AlertProps["children"];
  message?: AlertProps["children"];
}

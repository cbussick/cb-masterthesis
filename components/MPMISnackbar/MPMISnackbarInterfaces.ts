import { AlertProps, SnackbarProps } from "@mui/material";

export interface MPMISnackbarProps {
  isOpen: SnackbarProps["open"];
  onClose: SnackbarProps["onClose"];
  action?: SnackbarProps["action"];
  severity?: AlertProps["severity"];
  title?: AlertProps["children"];
  message?: AlertProps["children"];
}

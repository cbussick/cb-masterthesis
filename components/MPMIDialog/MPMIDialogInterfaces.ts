import {
  DialogActionsProps,
  DialogContentProps,
  DialogProps,
} from "@mui/material";
import { FormHTMLAttributes, ReactNode } from "react";

export interface MPMIDialogProps {
  isOpen: DialogProps["open"];
  onClose: VoidFunction;
  title?: ReactNode;
  children: ReactNode;
  actions?: DialogActionsProps["children"];
  fullWidth?: DialogProps["fullWidth"];
  dialogContentProps?: DialogContentProps;
  formProps?: FormHTMLAttributes<HTMLFormElement>;
}

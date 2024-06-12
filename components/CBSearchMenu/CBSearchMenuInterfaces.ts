import { DialogProps } from "@mui/material";
import { CBDialogProps } from "../CBDialog/CBDialogInterfaces";

export interface CBSearchMenuProps {
  isMenuOpen: DialogProps["open"];
  onClose: CBDialogProps["onClose"];
}

import { DialogProps } from "@mui/material";
import { MPMIDialogProps } from "../MPMIDialog/MPMIDialogInterfaces";

export interface MPMISearchMenuProps {
  isMenuOpen: DialogProps["open"];
  onClose: MPMIDialogProps["onClose"];
}

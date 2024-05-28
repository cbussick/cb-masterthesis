import { MenuProps } from "@mui/material";

export interface MPMIUserOptionsMenuProps {
  userMenuId: string;
  anchorElId: string;
  anchorEl: MenuProps["anchorEl"];
  isUserMenuOpen: MenuProps["open"];
  onClose: VoidFunction;
}

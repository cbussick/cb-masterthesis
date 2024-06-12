import { MenuProps } from "@mui/material";

export interface CBUserOptionsMenuProps {
  userMenuId: string;
  anchorElId: string;
  anchorEl: MenuProps["anchorEl"];
  isUserMenuOpen: MenuProps["open"];
  onClose: VoidFunction;
}

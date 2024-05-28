"use client";

import { handleSignOut } from "@/helpers/handleSignOut";
import { useSnackbar } from "@/ui/useSnackbar";
import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MPMIUnstyledNextLink } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { MPMIUserOptionsMenuProps } from "./MPMIUserOptionsMenuInterfaces";

export const MPMIUserOptionsMenu = ({
  userMenuId,
  anchorElId,
  anchorEl,
  isUserMenuOpen,
  onClose,
}: MPMIUserOptionsMenuProps): JSX.Element => {
  const { showSnackbar } = useSnackbar();

  const onClickLogOut = () => {
    handleSignOut(showSnackbar);
    onClose();
  };

  return (
    <Menu
      id={userMenuId}
      anchorEl={anchorEl}
      open={isUserMenuOpen}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": anchorElId,
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MPMIUnstyledNextLink href="/einstellungen">
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>

          <ListItemText>Einstellungen</ListItemText>
        </MenuItem>
      </MPMIUnstyledNextLink>

      <MenuItem onClick={onClickLogOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>

        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

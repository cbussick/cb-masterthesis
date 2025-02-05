"use client";

import { handleSignOut } from "@/helpers/handleSignOut";
import { CBRoute } from "@/helpers/routes";
import { useSnackbar } from "@/ui/useSnackbar";
import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { CBUnstyledNextLink } from "../CBUnstyledNextLink/CBUnstyledNextLink";
import { CBUserOptionsMenuProps } from "./CBUserOptionsMenuInterfaces";

export const CBUserOptionsMenu = ({
  userMenuId,
  anchorElId,
  anchorEl,
  isUserMenuOpen,
  onClose,
}: CBUserOptionsMenuProps): JSX.Element => {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const onClickLogOut = () => {
    handleSignOut(showSnackbar, router);
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
      {false && (
        <CBUnstyledNextLink href={CBRoute.Einstellungen}>
          <MenuItem onClick={onClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>

            <ListItemText>Einstellungen</ListItemText>
          </MenuItem>
        </CBUnstyledNextLink>
      )}

      <MenuItem onClick={onClickLogOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>

        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

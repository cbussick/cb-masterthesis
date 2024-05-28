"use client";

import { NotificationsNone, Search } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { MPMIIconButton } from "../MPMIIconButton/MPMIIconButton";
import { MPMINotificationMenu } from "../MPMINotificationMenu/MPMINotificationMenu";
import { MPMISearchMenu } from "../MPMISearchMenu/MPMISearchMenu";

const notificationMenuIdRaw = "notification-menu";

export const MPMIUserActionsBar = (): JSX.Element => {
  const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState<boolean>(false);

  const isNotificationMenuOpen = Boolean(notificationsMenuAnchorEl);
  const notificationMenuId = isNotificationMenuOpen
    ? notificationMenuIdRaw
    : undefined;

  const handleNotificationIconButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setNotificationsMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setNotificationsMenuAnchorEl(null);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <MPMIIconButton
          onClick={(event) => handleNotificationIconButtonClick(event)}
          icon={<NotificationsNone />}
          ariaLabel="Benachrichtigungen"
          aria-describedby={notificationMenuId}
        />

        <MPMIIconButton
          onClick={() => setIsSearchMenuOpen((prevOpen) => !prevOpen)}
          icon={<Search />}
          ariaLabel="Suche"
        />
      </Stack>

      <MPMINotificationMenu
        id={notificationMenuId}
        anchorEl={notificationsMenuAnchorEl}
        isMenuOpen={isNotificationMenuOpen}
        onClose={handleUserMenuClose}
      />

      <MPMISearchMenu
        isMenuOpen={isSearchMenuOpen}
        onClose={() => setIsSearchMenuOpen(false)}
      />
    </>
  );
};

"use client";

import { NotificationsNone, Search } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { CBIconButton } from "../CBIconButton/CBIconButton";
import { CBNotificationMenu } from "../CBNotificationMenu/CBNotificationMenu";
import { CBSearchMenu } from "../CBSearchMenu/CBSearchMenu";

const notificationMenuIdRaw = "notification-menu";

export const CBUserActionsBar = (): JSX.Element => {
  const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [isSearchMenuOpen, setSearchMenuOpen] = useState<boolean>(false);

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
        <CBIconButton
          onClick={(event) => handleNotificationIconButtonClick(event)}
          icon={<NotificationsNone />}
          ariaLabel="Benachrichtigungen"
          aria-describedby={notificationMenuId}
        />

        <CBIconButton
          onClick={() => setSearchMenuOpen((prevOpen) => !prevOpen)}
          icon={<Search />}
          ariaLabel="Suche"
        />
      </Stack>

      <CBNotificationMenu
        id={notificationMenuId}
        anchorEl={notificationsMenuAnchorEl}
        isMenuOpen={isNotificationMenuOpen}
        onClose={handleUserMenuClose}
      />

      <CBSearchMenu
        isMenuOpen={isSearchMenuOpen}
        onClose={() => setSearchMenuOpen(false)}
      />
    </>
  );
};

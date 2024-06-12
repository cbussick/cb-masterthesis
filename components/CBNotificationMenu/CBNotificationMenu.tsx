"use client";

import { Popover, Stack, Typography } from "@mui/material";
import { CBEmoji } from "../CBEmoji/CBEmoji";
import { CBNotificationMenuProps } from "./CBNotificationMenuInterfaces";

export const CBNotificationMenu = ({
  id,
  isMenuOpen,
  anchorEl,
  onClose,
}: CBNotificationMenuProps): JSX.Element => {
  return (
    <Popover
      id={id}
      open={isMenuOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        width={250}
        minHeight={300}
        p={2}
      >
        <CBEmoji emoji="🍵" fontSize="75px" />

        <Typography align="center">Keine neuen Benachrichtigungen</Typography>
      </Stack>
    </Popover>
  );
};

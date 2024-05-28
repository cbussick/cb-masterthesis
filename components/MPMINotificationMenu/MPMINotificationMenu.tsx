"use client";

import { Popover, Stack, Typography } from "@mui/material";
import { MPMIEmoji } from "../MPMIEmoji/MPMIEmoji";
import { MPMINotificationMenuProps } from "./MPMINotificationMenuInterfaces";

export const MPMINotificationMenu = ({
  id,
  isMenuOpen,
  anchorEl,
  onClose,
}: MPMINotificationMenuProps): JSX.Element => {
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
        <MPMIEmoji emoji="🍵" fontSize="75px" />

        <Typography align="center">Keine neuen Benachrichtigungen</Typography>
      </Stack>
    </Popover>
  );
};

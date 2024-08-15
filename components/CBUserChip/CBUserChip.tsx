"use client";

import { useUser } from "@/firebase-client/useUser";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { CBUserOptionsMenu } from "../CBUserOptionsMenu/CBUserOptionsMenu";

const userChipId = "user-chip";
const userMenuId = "user-menu";

export const CBUserChip = (): JSX.Element => {
  const user = useUser();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isUserMenuOpen = Boolean(anchorEl);
  const handleUserChipClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Chip
        sx={{
          height: 36,
          p: 1,
          backgroundColor: (t) => t.palette.grey[200],
          "&:hover": {
            backgroundColor: (t) => t.palette.grey[300],
          },
        }}
        avatar={
          <Avatar src={user.customData.profilePicture} alt="Profilbild" />
        }
        label={
          <Typography
            sx={{
              fontWeight: (t) => t.typography.fontWeightMedium,
            }}
          >
            {user.customData.username}
          </Typography>
        }
        id={userChipId}
        aria-controls={isUserMenuOpen ? userMenuId : undefined}
        aria-haspopup="true"
        aria-expanded={isUserMenuOpen ? "true" : undefined}
        onClick={handleUserChipClick}
      />

      <CBUserOptionsMenu
        userMenuId={userChipId}
        anchorElId={userMenuId}
        anchorEl={anchorEl}
        isUserMenuOpen={isUserMenuOpen}
        onClose={handleUserMenuClose}
      />
    </Box>
  );
};

"use client";

import { LockRounded } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { CBAvatarChoiceProps } from "./CBAvatarChoiceInterfaces";

export const CBAvatarChoice = ({
  image,
  imageSize,
  unlocked,
}: CBAvatarChoiceProps): JSX.Element => {
  const avatarComponent: JSX.Element = (
    <Avatar
      alt={`Profilbild: ${image.alt}`}
      src={image.src}
      sx={{
        filter: unlocked ? undefined : "blur(3px) brightness(0.75)",
        width: imageSize,
        height: imageSize,
      }}
    />
  );

  return unlocked ? (
    avatarComponent
  ) : (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {avatarComponent}

      <LockRounded
        sx={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          margin: "auto",
          fontSize: imageSize / 2,
          position: "absolute",
          color: (t) => t.palette.common.white,
        }}
      />
    </Box>
  );
};

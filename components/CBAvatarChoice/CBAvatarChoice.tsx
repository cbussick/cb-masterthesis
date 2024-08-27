"use client";

import { LockRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import { CBAvatar } from "../CBAvatar/CBAvatar";
import { CBAvatarChoiceProps } from "./CBAvatarChoiceInterfaces";

export const CBAvatarChoice = ({
  image,
  imageSize,
  unlocked,
}: CBAvatarChoiceProps): JSX.Element => {
  const avatarComponent: JSX.Element = (
    <CBAvatar
      image={image}
      imageSize={imageSize}
      avatarProps={{
        sx: {
          filter:
            unlocked === true || unlocked === undefined
              ? undefined
              : "blur(3px) brightness(0.75)",
        },
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

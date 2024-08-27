"use client";

import { Avatar } from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBAvatarProps } from "./CBAvatarInterfaces";

export const CBAvatar = ({
  image,
  imageSize,
  imageProps,
  avatarProps,
}: CBAvatarProps): JSX.Element => {
  return (
    <Avatar
      {...avatarProps}
      sx={{
        width: imageSize,
        height: imageSize,
        bgcolor: (t) => t.palette.background.default,
        ...avatarProps?.sx,
      }}
    >
      <CBImage
        image={image}
        boxProps={{
          sx: {
            height: "100%",
          },
        }}
        imageElementProps={{ sizes: `${imageSize}px` }}
        {...imageProps}
      />
    </Avatar>
  );
};

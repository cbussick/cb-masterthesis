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
  const hasImage = image.src !== "";

  return (
    <Avatar
      {...avatarProps}
      src={hasImage ? undefined : ""}
      sx={{
        width: imageSize,
        height: imageSize,
        bgcolor: hasImage ? (t) => t.palette.background.default : undefined,
        ...avatarProps?.sx,
      }}
    >
      {image.src !== "" && (
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
      )}
    </Avatar>
  );
};

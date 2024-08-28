"use client";

import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { CBImageProps } from "./CBImageInterfaces";

export const CBImage = ({
  image,
  boxProps,
  imageElementProps,
}: CBImageProps): JSX.Element => {
  const [isImageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <Box
      {...boxProps}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 260,
        ...boxProps?.sx,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        {...imageElementProps}
        onLoad={() => {
          setImageLoading(false);
        }}
        style={{ objectFit: "contain", ...imageElementProps?.style }}
        quality={100}
      />

      {isImageLoading && <CircularProgress size={80} />}
    </Box>
  );
};

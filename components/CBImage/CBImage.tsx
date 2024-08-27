"use client";

import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { CBImageProps } from "./CBImageInterfaces";

export const CBImage = ({
  image,
  boxProps,
  imageElementProps: imageProps,
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
        onLoad={() => setImageLoading(false)}
        {...imageProps}
        style={{ objectFit: "contain", ...imageProps?.style }}
        quality={100}
      />

      {isImageLoading && <CircularProgress size={80} />}
    </Box>
  );
};

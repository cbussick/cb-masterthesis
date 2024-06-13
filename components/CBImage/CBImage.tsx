"use client";

import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { CBImageProps } from "./CBImageInterfaces";

export const CBImage = ({
  image,
  boxProps,
  draggable,
}: CBImageProps): JSX.Element => {
  const [isImageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <Box
      sx={{
        width: "100%",
        height: 260,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...boxProps}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        style={{ objectFit: "contain" }}
        onLoad={() => setImageLoading(false)}
        draggable={draggable}
      />

      {isImageLoading && <CircularProgress size={80} />}
    </Box>
  );
};

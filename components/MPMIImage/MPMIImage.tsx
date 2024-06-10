"use client";

import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { MPMIImageProps } from "./MPMIImageInterfaces";

export const MPMIImage = ({
  image,
  boxProps,
  draggable,
}: MPMIImageProps): JSX.Element => {
  const [isImageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <Box
      width="100%"
      height={260}
      {...boxProps}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
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

import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { BoxProps } from "@mui/material";
import { ImageProps } from "next/image";
import { HTMLAttributes } from "react";

export interface CBImageProps {
  image: CBImgWithAlt;
  boxProps?: BoxProps;
  imageElementProps?: Omit<ImageProps, "src" | "alt"> &
    HTMLAttributes<HTMLImageElement>;
}

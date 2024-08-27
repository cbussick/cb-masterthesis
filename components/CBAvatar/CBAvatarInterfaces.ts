import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { AvatarProps } from "@mui/material";
import { CBImageProps } from "../CBImage/CBImageInterfaces";

export interface CBAvatarProps {
  image: CBImgWithAlt;
  imageSize?: string | number;
  imageProps?: Omit<CBImageProps, "image">;
  avatarProps?: AvatarProps;
}

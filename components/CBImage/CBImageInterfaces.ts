import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { BoxProps } from "@mui/material";

export interface CBImageProps {
  image: CBImgWithAlt;
  boxProps?: BoxProps;
  draggable?: boolean;
}

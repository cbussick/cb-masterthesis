import { MPMIImgWithAlt } from "@/helpers/MPMIImgWithAlt";
import { BoxProps } from "@mui/material";

export interface MPMIImageProps {
  image: MPMIImgWithAlt;
  boxProps?: BoxProps;
  draggable?: boolean;
}

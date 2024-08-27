import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { CBImageProps } from "../CBImage/CBImageInterfaces";
import { CBProgressBarProps } from "../CBProgressBar/CBProgressBarInterfaces";

export interface CBProgressCardProps {
  title: string;
  subTitle: string;
  image: CBImgWithAlt;
  imageElementProps?: CBImageProps["imageElementProps"];
  progressValue: number;
  maxValue: number;
  format?: CBProgressBarProps["format"];
}

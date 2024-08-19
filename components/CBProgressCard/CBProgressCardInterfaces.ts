import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { CBProgressBarProps } from "../CBProgressBar/CBProgressBarInterfaces";

export interface CBProgressCardProps {
  image: CBImgWithAlt;
  title: string;
  subTitle: string;
  progressValue: number;
  maxValue: number;
  format?: CBProgressBarProps["format"];
}

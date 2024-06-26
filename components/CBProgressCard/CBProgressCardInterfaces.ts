import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export interface CBProgressCardProps {
  image: CBImgWithAlt;
  title: string;
  subTitle: string;
  progressValue: number;
  maxValue: number;
}

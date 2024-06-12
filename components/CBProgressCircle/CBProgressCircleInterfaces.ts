import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export interface CBProgressCircleProps {
  label: string;
  progress: number;
  href: string;
  unlocked: boolean;
  icon: CBImgWithAlt;
}

import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export interface CBProgressCircleProps {
  id: string;
  label: string;
  progress: number;
  href: string;
  unlocked: boolean;
  icon: CBImgWithAlt;
}

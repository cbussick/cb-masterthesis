import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export interface CBAchievementCardProps {
  image: CBImgWithAlt;
  title: string;
  subTitle: string;
  progressValue: number;
  progressGoal: number;
}

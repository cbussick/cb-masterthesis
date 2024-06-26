import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export interface CBInfoCardProps {
  image: CBImgWithAlt;
  text: string;
  href?: string;
  disabled?: boolean;
}

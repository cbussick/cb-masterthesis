import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export interface CBGraphCardProps {
  image: CBImgWithAlt;
  title: string;
  subTitle: string;
  graph: JSX.Element;
}

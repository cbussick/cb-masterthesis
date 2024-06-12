import { StackProps } from "@mui/material";
import { ReactNode } from "react";

export interface CBPageHeaderProps {
  title: ReactNode;
  subTitle?: ReactNode;
  isOnTransparentBackground?: boolean;
  sx?: StackProps["sx"];
}

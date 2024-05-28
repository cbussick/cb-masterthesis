import { StackProps } from "@mui/material";
import { ReactNode } from "react";

export interface MPMIPageHeaderProps {
  title: ReactNode;
  subTitle?: ReactNode;
  isOnTransparentBackground?: boolean;
  sx?: StackProps["sx"];
}

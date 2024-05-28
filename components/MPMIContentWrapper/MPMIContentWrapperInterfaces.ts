import { BoxProps } from "@mui/material";
import { ReactNode } from "react";

export interface MPMIContentWrapperProps {
  children: ReactNode;
  bgcolor?: BoxProps["bgcolor"];
  paddingHorizontal?: BoxProps["paddingX"];
  sxOuterContainer?: BoxProps["sx"];
  sxInnerContainer?: BoxProps["sx"];
}

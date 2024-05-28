import { CSSProperties } from "react";
import { MPMIUnstyledNextLinkProps } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLinkInterfaces";

export interface MPMILinkProps {
  children: MPMIUnstyledNextLinkProps["children"];
  href: MPMIUnstyledNextLinkProps["href"];
  onClick?: MPMIUnstyledNextLinkProps["onClick"];
  style?: CSSProperties;
}

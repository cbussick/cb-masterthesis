import { LinkProps } from "next/link";
import { CSSProperties, ReactNode } from "react";

export interface MPMIUnstyledNextLinkProps {
  children: ReactNode;
  href: string;
  onClick?: LinkProps["onClick"];
  style?: CSSProperties;
}

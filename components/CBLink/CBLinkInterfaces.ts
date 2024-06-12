import { CSSProperties } from "react";
import { CBUnstyledNextLinkProps } from "../CBUnstyledNextLink/CBUnstyledNextLinkInterfaces";

export interface CBLinkProps {
  children: CBUnstyledNextLinkProps["children"];
  href: CBUnstyledNextLinkProps["href"];
  onClick?: CBUnstyledNextLinkProps["onClick"];
  style?: CSSProperties;
}

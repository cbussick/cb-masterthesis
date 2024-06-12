"use client";

import { useTheme } from "@mui/material";
import { CBUnstyledNextLink } from "../CBUnstyledNextLink/CBUnstyledNextLink";
import { CBLinkProps } from "./CBLinkInterfaces";

export const CBLink = ({
  children,
  href,
  onClick,
  style,
}: CBLinkProps): JSX.Element => {
  const theme = useTheme();

  return (
    <CBUnstyledNextLink
      href={href}
      onClick={onClick}
      style={{ color: theme.palette.primary.main, ...style }}
    >
      {children}
    </CBUnstyledNextLink>
  );
};

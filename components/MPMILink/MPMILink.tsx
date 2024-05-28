"use client";

import { useTheme } from "@mui/material";
import { MPMIUnstyledNextLink } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { MPMILinkProps } from "./MPMILinkInterfaces";

export const MPMILink = ({
  children,
  href,
  onClick,
  style,
}: MPMILinkProps): JSX.Element => {
  const theme = useTheme();

  return (
    <MPMIUnstyledNextLink
      href={href}
      onClick={onClick}
      style={{ color: theme.palette.primary.main, ...style }}
    >
      {children}
    </MPMIUnstyledNextLink>
  );
};

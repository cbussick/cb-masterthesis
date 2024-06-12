"use client";

import Link from "next/link";
import { CBUnstyledNextLinkProps } from "./CBUnstyledNextLinkInterfaces";

export const CBUnstyledNextLink = ({
  children,
  href,
  onClick,
  style,
}: CBUnstyledNextLinkProps): JSX.Element => {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ textDecoration: "none", color: "inherit", ...style }}
    >
      {children}
    </Link>
  );
};

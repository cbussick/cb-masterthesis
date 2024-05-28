"use client";

import Link from "next/link";
import { MPMIUnstyledNextLinkProps } from "./MPMIUnstyledNextLinkInterfaces";

export const MPMIUnstyledNextLink = ({
  children,
  href,
  onClick,
  style,
}: MPMIUnstyledNextLinkProps): JSX.Element => {
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

"use client";

import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { CBUnstyledNextLink } from "../CBUnstyledNextLink/CBUnstyledNextLink";
import { CBBreadcrumbsProps } from "./CBBreadcrumbsInterfaces";

export const CBBreadcrumbs = ({
  previousLinks,
  currentLabel,
}: CBBreadcrumbsProps): JSX.Element => {
  return (
    <Stack spacing={1}>
      <Breadcrumbs separator={<NavigateNext />} sx={{ color: "inherit" }}>
        {previousLinks.map((link) => (
          <CBUnstyledNextLink key={link.href} href={link.href}>
            <Typography>{link.label}</Typography>
          </CBUnstyledNextLink>
        ))}
      </Breadcrumbs>

      {currentLabel && <Typography variant="h2">{currentLabel}</Typography>}
    </Stack>
  );
};

"use client";

import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { MPMIUnstyledNextLink } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { MPMIBreadcrumbsProps } from "./MPMIBreadcrumbsInterfaces";

export const MPMIBreadcrumbs = ({
  previousLinks,
  currentLabel,
}: MPMIBreadcrumbsProps): JSX.Element => {
  return (
    <Stack spacing={1}>
      <Breadcrumbs separator={<NavigateNext />} sx={{ color: "inherit" }}>
        {previousLinks.map((link) => (
          <MPMIUnstyledNextLink key={link.href} href={link.href}>
            <Typography>{link.label}</Typography>
          </MPMIUnstyledNextLink>
        ))}
      </Breadcrumbs>

      {currentLabel && <Typography variant="h2">{currentLabel}</Typography>}
    </Stack>
  );
};

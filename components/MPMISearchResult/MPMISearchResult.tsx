"use client";

import { menuItems } from "@/data/menuItems";
import { InfoRounded } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MPMIUnstyledNextLink } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { MPMISearchResultProps } from "./MPMISearchResultInterfaces";

export const MPMISearchResult = ({
  routeData,
  onClose,
}: MPMISearchResultProps): JSX.Element => {
  const icon = menuItems.find((item) => item.href === routeData.route)?.icon;

  return (
    <MPMIUnstyledNextLink href={routeData.route} onClick={onClose}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon || <InfoRounded />}</ListItemIcon>

          <ListItemText
            primary={routeData.title}
            secondary={routeData.subtitle}
          />
        </ListItemButton>
      </ListItem>
    </MPMIUnstyledNextLink>
  );
};

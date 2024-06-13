import { menuItems } from "@/data/menuItems";
import { InfoRounded } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CBUnstyledNextLink } from "../../CBUnstyledNextLink/CBUnstyledNextLink";
import { CBSearchResultProps } from "./CBSearchResultInterfaces";

export const CBSearchResult = ({
  routeData,
  onClose,
}: CBSearchResultProps): JSX.Element => {
  const icon = menuItems.find((item) => item.href === routeData.route)?.icon;

  return (
    <CBUnstyledNextLink href={routeData.route} onClick={onClose}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon || <InfoRounded />}</ListItemIcon>

          <ListItemText
            primary={routeData.title}
            secondary={routeData.subtitle}
          />
        </ListItemButton>
      </ListItem>
    </CBUnstyledNextLink>
  );
};

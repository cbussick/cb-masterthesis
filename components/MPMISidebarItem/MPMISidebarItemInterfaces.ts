import {
  ListItemButtonProps,
  ListItemIconProps,
  ListItemTextProps,
} from "@mui/material";

/**
 * Necessary because the built-in `ListItemButtonProps` do not include `href`?
 */
interface MPMIListItemButtonProps extends ListItemButtonProps {
  href?: string;
}

export interface MPMISidebarItemProps {
  listItemButtonProps: MPMIListItemButtonProps;
  icon: ListItemIconProps["children"];
  label: ListItemTextProps["primary"];
}

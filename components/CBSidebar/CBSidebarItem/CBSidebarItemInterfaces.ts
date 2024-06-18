import {
  ListItemButtonProps,
  ListItemIconProps,
  ListItemTextProps,
} from "@mui/material";

/**
 * Necessary because the built-in `ListItemButtonProps` do not include `href`?
 */
interface CBListItemButtonProps extends ListItemButtonProps {
  href?: string;
}

export interface CBSidebarItemProps {
  listItemButtonProps: CBListItemButtonProps;
  icon: ListItemIconProps["children"];
  label: ListItemTextProps["primary"];
  isExpansionTransitionRunning: boolean;
}

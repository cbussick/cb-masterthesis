import { IconButtonProps } from "@mui/material";

export interface CBIconButtonProps {
  icon: IconButtonProps["children"];
  onClick: IconButtonProps["onClick"];
  ariaLabel: IconButtonProps["aria-label"];
}

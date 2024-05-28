import { IconButtonProps } from "@mui/material";

export interface MPMIIconButtonProps {
  icon: IconButtonProps["children"];
  onClick: IconButtonProps["onClick"];
  ariaLabel: IconButtonProps["aria-label"];
}

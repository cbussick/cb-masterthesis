"use client";

import { IconButton } from "@mui/material";
import { CBIconButtonProps } from "./CBIconButtonInterfaces";

export const CBIconButton = ({
  icon,
  onClick,
  ariaLabel,
}: CBIconButtonProps): JSX.Element => {
  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        backgroundColor: (t) => t.palette.grey[200],
        "&:hover": {
          backgroundColor: (t) => t.palette.grey[300],
        },
      }}
    >
      {icon}
    </IconButton>
  );
};

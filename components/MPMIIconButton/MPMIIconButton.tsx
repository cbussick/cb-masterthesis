"use client";

import { IconButton } from "@mui/material";
import { MPMIIconButtonProps } from "./MPMIIconButtonInterfaces";

export const MPMIIconButton = ({
  icon,
  onClick,
  ariaLabel,
}: MPMIIconButtonProps): JSX.Element => {
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

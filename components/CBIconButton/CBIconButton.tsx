"use client";

import { IconButton, Tooltip } from "@mui/material";
import { CBIconButtonProps } from "./CBIconButtonInterfaces";

export const CBIconButton = ({
  icon,
  onClick,
  label,
}: CBIconButtonProps): JSX.Element => {
  return (
    <Tooltip title={label}>
      <IconButton
        onClick={onClick}
        aria-label={label}
        sx={{
          backgroundColor: (t) => t.palette.grey[200],
          "&:hover": {
            backgroundColor: (t) => t.palette.grey[300],
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

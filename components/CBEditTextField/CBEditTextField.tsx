"use client";

import { EditRounded } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { CBEditTextFieldProps } from "./CBEditTextFieldInterfaces";

export const CBEditTextField = ({
  label,
  value,
  onClickEdit,
  sx,
}: CBEditTextFieldProps): JSX.Element => {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      disabled
      sx={{ flexGrow: 1, ...sx }}
      InputProps={{
        endAdornment: onClickEdit && (
          <IconButton onClick={onClickEdit}>
            <EditRounded />
          </IconButton>
        ),
      }}
    />
  );
};

"use client";

import { EditRounded } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { CBEditTextFieldProps } from "./CBEditTextFieldInterfaces";

export const CBEditTextField = ({
  label,
  value,
  onClickIcon,
  sx,
}: CBEditTextFieldProps): JSX.Element => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        ...sx,
      }}
    >
      <TextField
        label={label}
        variant="filled"
        value={value}
        disabled
        sx={{ flexGrow: 1 }}
      />

      <IconButton onClick={onClickIcon}>
        <EditRounded />
      </IconButton>
    </Stack>
  );
};

"use client";

import { Check } from "@mui/icons-material";
import { Alert, AlertTitle, Snackbar, Stack } from "@mui/material";
import Image from "next/image";
import { CBSnackbarProps } from "./CBSnackbarInterfaces";

export const CBSnackbar = ({
  isOpen,
  onClose,
  action,
  severity,
  title,
  message,
}: CBSnackbarProps): JSX.Element => {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      message={message}
      action={action}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "flex-end",
        }}
      >
        <Alert
          severity={severity}
          elevation={6}
          iconMapping={{ success: <Check /> }}
          sx={{ width: "100%" }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}

          {message}
        </Alert>

        <Image src="/logo/dina.svg" alt="DiNA" width="100" height="100" />
      </Stack>
    </Snackbar>
  );
};

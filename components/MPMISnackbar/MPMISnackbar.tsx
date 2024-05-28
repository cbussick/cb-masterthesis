"use client";

import { Check } from "@mui/icons-material";
import { Alert, AlertTitle, Snackbar, Stack } from "@mui/material";
import Image from "next/image";
import { MPMISnackbarProps } from "./MPMISnackbarInterfaces";

export const MPMISnackbar = ({
  isOpen,
  onClose,
  action,
  severity,
  title,
  message,
}: MPMISnackbarProps): JSX.Element => {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      message={message}
      action={action}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Stack direction="row" alignItems="flex-end">
        <Alert
          severity={severity}
          sx={{ width: "100%" }}
          elevation={6}
          iconMapping={{ success: <Check /> }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}

          {message}
        </Alert>

        <Image src="/logo/dina.svg" alt="DiNA" width="100" height="100" />
      </Stack>
    </Snackbar>
  );
};

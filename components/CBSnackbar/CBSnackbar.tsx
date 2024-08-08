import { Check } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Snackbar,
  SnackbarCloseReason,
  Stack,
} from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBSnackbarProps } from "./CBSnackbarInterfaces";

export const CBSnackbar = ({
  isOpen,
  onClose,
  action,
  severity,
  title,
  message,
}: CBSnackbarProps): JSX.Element => {
  const preparedOnClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    // If you click away from the Snackbar, it should not close
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={isOpen}
      onClose={preparedOnClose}
      autoHideDuration={6000}
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
          onClose={onClose}
          severity={severity}
          elevation={6}
          iconMapping={{ success: <Check /> }}
          sx={{ width: "100%" }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}

          {message}
        </Alert>

        <CBImage
          image={{
            src: "/logo/dina.svg",
            alt: "DiNA",
          }}
          boxProps={{
            sx: {
              width: 100,
              height: 100,
            },
          }}
        />
      </Stack>
    </Snackbar>
  );
};

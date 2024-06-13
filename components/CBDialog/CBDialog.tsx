import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { CBDialogProps } from "./CBDialogInterfaces";

export const CBDialog = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  fullWidth,
  dialogContentProps,
  formProps,
}: CBDialogProps): JSX.Element => {
  const contentAndActions = (
    <>
      <DialogContent
        {...dialogContentProps}
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "visible",
          ...dialogContentProps?.sx,
        }}
      >
        {children}
      </DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </>
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth={fullWidth === undefined ? true : fullWidth}
    >
      <Stack
        sx={{
          p: 2,
          pb: 3,
        }}
      >
        <IconButton sx={{ alignSelf: "flex-end" }} onClick={onClose}>
          <Close />
        </IconButton>

        <Stack>
          {title && (
            <DialogTitle variant="h2" display="flex" justifyContent="center">
              {title}
            </DialogTitle>
          )}

          {formProps ? (
            <form {...formProps}>
              <Stack>{contentAndActions}</Stack>
            </form>
          ) : (
            contentAndActions
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};

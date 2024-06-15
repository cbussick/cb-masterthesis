"use client";

import { useUser } from "@/firebase/useUser";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CBDeleteAccountDialog } from "../CBDeleteAccountDialog/CBDeleteAccountDialog";

export const CBGeneralSettings = (): JSX.Element => {
  const user = useUser();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const onClickDelete = () => {
    setDeleteDialogOpen(true);
  };

  const commonTextFieldProps: Partial<TextFieldProps> = {
    disabled: true,
    variant: "filled",
    sx: { flexGrow: 1 },
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography>
          Hier kannst du allgemeine Informationen zu deinem Konto einsehen und
          ggfs. deinen Namen und deine E-Mail ändern.
        </Typography>

        <Box>
          <Container maxWidth="md">
            <Stack spacing={2}>
              <TextField
                label="Vorname"
                value={user?.customData.firstName || ""}
                {...commonTextFieldProps}
              />

              <TextField
                label="Nachname"
                value={user?.customData.lastName || ""}
                {...commonTextFieldProps}
              />

              <TextField
                label="E-Mail"
                value={user?.user?.email || ""}
                {...commonTextFieldProps}
              />

              <TextField
                label="Abo-Lizenz"
                value="Aj78AHkd0nWU16434"
                {...commonTextFieldProps}
              />

              <TextField
                label="Lehrinstitution"
                value="Berufskolleg Gladbeck"
                {...commonTextFieldProps}
              />

              <Button
                variant="text"
                sx={{
                  color: (t) => t.palette.error.main,
                }}
                onClick={onClickDelete}
              >
                Account löschen
              </Button>
            </Stack>
          </Container>
        </Box>
      </Stack>

      <CBDeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

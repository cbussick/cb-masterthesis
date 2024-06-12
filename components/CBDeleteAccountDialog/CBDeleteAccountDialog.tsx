"use client";

import { getAuthError } from "@/firebase/authErrors";
import { reauthenticateUser } from "@/firebase/reauthenticateUser";
import { useUser } from "@/firebase/useUser";
import { useSnackbar } from "@/ui/useSnackbar";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, deleteUser } from "firebase/auth";
import { useForm } from "react-hook-form";
import { CBDialog } from "../CBDialog/CBDialog";
import { CBDeleteAccountDialogProps } from "./CBDeleteAccountDialogInterfaces";

interface DeleteAccountFormValues {
  password: string;
}

export const CBDeleteAccountDialog = ({
  isOpen,
  onClose,
}: CBDeleteAccountDialogProps): JSX.Element => {
  const user = useUser();
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<DeleteAccountFormValues>();

  const password = watch("password");

  const handleUltimateDelete = () => {
    reset();

    if (user?.user && user.user.email) {
      const credential = EmailAuthProvider.credential(
        user.user.email,
        password,
      );

      reauthenticateUser(user.user, credential)
        .then(() => {
          if (user.user) {
            deleteUser(user.user)
              .then(() => {
                showSnackbar(
                  "Account gelöscht",
                  "Dein Account wurde erfolgreich gelöscht. Wir hoffen, dass du uns bald wieder besuchst. Bis zum nächsten Mal!",
                  "success",
                );
              })
              .catch((error: FirebaseError) => {
                const errorMessage = getAuthError(error.code) || error.message;

                showSnackbar(
                  "Account konnte nicht gelöscht werden",
                  errorMessage,
                  "error",
                );
              });
          }
        })
        .catch((error: FirebaseError) => {
          const errorMessage = getAuthError(error.code) || error.message;

          showSnackbar(
            "Account konnte nicht gelöscht werden",
            errorMessage,
            "error",
          );
        });
    }
    onClose();
  };

  return (
    <CBDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Konto löschen?"
      formProps={{
        onSubmit: handleSubmit(handleUltimateDelete),
        noValidate: true,
      }}
      actions={
        <>
          <Button variant="text" onClick={onClose}>
            Abbrechen
          </Button>

          <Button
            type="submit"
            sx={{
              bgcolor: (t) => t.palette.error.main,
              ":hover": { bgcolor: (t) => t.palette.error.dark },
            }}
          >
            Löschen
          </Button>
        </>
      }
    >
      <Stack spacing={2}>
        <Typography variant="body2">
          Wenn du dein Konto löschst, kannst du diesen Schritt nicht mehr
          rückgängig machen. Alle deine Daten werden gelöscht und du kannst dich
          nicht mehr anmelden.
        </Typography>

        <Stack spacing={3}>
          <Typography variant="h4">
            Bist du dir sicher, dass du uns verlassen möchtest?
          </Typography>

          <Typography variant="body2">
            Um fortzufahren, gib bitte dein Passwort ein.
          </Typography>

          <TextField
            label="Passwort"
            type="password"
            {...register("password", {
              required: "Bitte gib dein Passwort ein",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Stack>
      </Stack>
    </CBDialog>
  );
};

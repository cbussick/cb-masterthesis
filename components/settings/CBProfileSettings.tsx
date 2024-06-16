"use client";

import { getAuthError } from "@/firebase/authErrors";
import { changePassword } from "@/firebase/changePassword";
import { changeUsername } from "@/firebase/changeUsername";
import { reauthenticateUser } from "@/firebase/reauthenticateUser";
import { useUser } from "@/firebase/useUser";
import { usernameRegex } from "@/helpers/regex";
import { useSnackbar } from "@/ui/useSnackbar";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CBDeleteAccountDialog } from "../CBDeleteAccountDialog/CBDeleteAccountDialog";
import { CBDialog } from "../CBDialog/CBDialog";
import { CBEditTextField } from "../CBEditTextField/CBEditTextField";
import { CBSettingsSection } from "./CBSettingsSection/CBSettingsSection";

const usernameId = "username";
const oldPasswordId = "oldPassword";
const newPasswordId = "newPassword";

interface ChangeUsernameFormValues {
  username: string;
}

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

export const CBProfileSettings = (): JSX.Element => {
  const user = useUser();
  const { showSnackbar } = useSnackbar();

  const [isEditingUsername, setEditingUsername] = useState<boolean>(false);
  const [isEditingPassword, setEditingPassword] = useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const oldUsername = user?.customData.username || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangeUsernameFormValues>();

  const {
    register: registerPW,
    handleSubmit: handleSubmitPW,
    formState: { errors: errorsPW },
    watch: watchPW,
  } = useForm<ChangePasswordFormValues>();

  const username = watch(usernameId);
  const oldPassword = watchPW(oldPasswordId);
  const newPassword = watchPW(newPasswordId);

  const handleEditUsernameClose = () => {
    setEditingUsername(false);
  };

  const handleEditPasswordClose = () => {
    setEditingPassword(false);
  };

  const handleSaveButtonClickUsername = () => {
    if (user?.user) {
      changeUsername(user.user.uid, username)
        .then(() => {
          showSnackbar(
            "Benutzername geändert",
            "Du hast deinen Benutzernamen erfolgreich geändert.",
            "success",
          );
        })
        .catch((error: FirebaseError) => {
          const errorMessage = getAuthError(error.code) || error.message;

          showSnackbar(
            "Benutzername konnte nicht geändert werden",
            errorMessage,
            "error",
          );
        });
    }
    handleEditUsernameClose();
  };

  const handleSaveButtonClickPassword = () => {
    if (user?.user && user.user.email) {
      const credential = EmailAuthProvider.credential(
        user.user.email,
        oldPassword,
      );
      reauthenticateUser(user.user, credential)
        .then(() => {
          if (user.user) {
            changePassword(user.user, newPassword, showSnackbar);
          }
        })
        .catch((error: FirebaseError) => {
          const errorMessage = getAuthError(error.code) || error.message;

          showSnackbar(
            "Passwort konnte nicht geändert werden",
            errorMessage,
            "error",
          );
        });
      handleEditPasswordClose();
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography>Hier kannst du dein Profil anpassen.</Typography>

        <CBSettingsSection title="Allgemeines">
          <Stack spacing={2}>
            <CBEditTextField
              label="Benutzername"
              value={oldUsername}
              onClickEdit={() => setEditingUsername(true)}
            />

            <CBEditTextField
              label="Passwort"
              value="********"
              onClickEdit={() => setEditingPassword(true)}
            />

            <CBEditTextField
              label="Vorname"
              value={user?.customData.firstName || ""}
            />

            <CBEditTextField
              label="Nachname"
              value={user?.customData.lastName || ""}
            />

            <CBEditTextField label="E-Mail" value={user?.user?.email || ""} />

            <Button
              variant="text"
              sx={{
                color: (t) => t.palette.error.main,
                alignSelf: "center",
              }}
              onClick={() => {
                setDeleteDialogOpen(true);
              }}
            >
              Account löschen
            </Button>
          </Stack>
        </CBSettingsSection>
      </Stack>

      <CBDialog
        isOpen={isEditingUsername}
        onClose={handleEditUsernameClose}
        title="Benutzernamen ändern"
        actions={
          <>
            <Button variant="text" onClick={handleEditUsernameClose}>
              Schließen
            </Button>

            <Button type="submit">Speichern</Button>
          </>
        }
        formProps={{
          onSubmit: handleSubmit(handleSaveButtonClickUsername),
          noValidate: true,
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Aktueller Benutzername"
            type="text"
            disabled
            variant="outlined"
            value={oldUsername}
          />

          <TextField
            label="Neuer Benutzername"
            type="text"
            {...register(usernameId, {
              required: "Bitte gib einen Benutzernamen ein",
              pattern: {
                value: usernameRegex,
                message: "Bitte gib einen gültigen Benutzernamen ein",
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </Stack>
      </CBDialog>

      <CBDialog
        isOpen={isEditingPassword}
        onClose={handleEditPasswordClose}
        title="Passwort ändern"
        actions={
          <>
            <Button variant="text" onClick={handleEditPasswordClose}>
              Schließen
            </Button>

            <Button type="submit">Speichern</Button>
          </>
        }
        formProps={{
          onSubmit: handleSubmitPW(handleSaveButtonClickPassword),
          noValidate: true,
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Altes Passwort"
            type="password"
            variant="outlined"
            {...registerPW(oldPasswordId, {
              required: "Bitte gib dein altes Passwort ein",
            })}
            error={!!errorsPW.oldPassword}
            helperText={errorsPW.oldPassword?.message}
          />

          <TextField
            label="Neues Passwort"
            type="password"
            variant="outlined"
            {...registerPW(newPasswordId, {
              required: "Bitte gib ein neues Passwort ein",
            })}
            error={!!errorsPW.newPassword}
            helperText={errorsPW.newPassword?.message}
          />
        </Stack>
      </CBDialog>

      <CBDeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

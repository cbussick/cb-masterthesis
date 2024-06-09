"use client";

import { getAuthError } from "@/firebase/authErrors";
import { changePassword } from "@/firebase/changePassword";
import { changeProfilePicture } from "@/firebase/changeProfilePicture";
import { changeUsername } from "@/firebase/changeUsername";
import { reauthenticateUser } from "@/firebase/reauthenticateUser";
import { useUser } from "@/firebase/useUser";
import { usernameRegex } from "@/helpers/regex";
import { useSnackbar } from "@/ui/useSnackbar";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MPMIDialog } from "../MPMIDialog/MPMIDialog";
import { MPMIProfileImageSelector } from "../MPMIProfileImageSelector/MPMIProfileImageSelector";

const pictureSize = 150;

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

export const MPMIProfileSettings = (): JSX.Element => {
  const { showSnackbar } = useSnackbar();
  const user = useUser();
  const theme = useTheme();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(
    user?.customData.profilePicture || "",
  );

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
    setIsEditingUsername(false);
  };

  const handleEditPasswordClose = () => {
    setIsEditingPassword(false);
  };

  const handleSaveButtonClickUsername = () => {
    if (user?.user) {
      changeUsername(user.user.uid, username)
        .then(() => {
          user.setCustomData((prevCustomData) => ({
            ...prevCustomData,
            username,
          }));
          showSnackbar(
            "Benutzername geändert",
            "Du hast deinen Benutzernamen erfolgreich geändert.",
            "success",
          );
        })
        .catch((error: FirebaseError) => {
          const errorCode = error.code;
          const errorMessage = getAuthError(errorCode) || error.message;

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
          const errorCode = error.code;
          const errorMessage = getAuthError(errorCode) || error.message;

          showSnackbar(
            "Passwort konnte nicht geändert werden",
            errorMessage,
            "error",
          );
        });
      handleEditPasswordClose();
    }
  };

  const handleSaveButtonClickProfilePic = () => {
    if (user?.user) {
      changeProfilePicture(user.user.uid, profilePicture)
        .then(() => {
          user.setCustomData((prevCustomData) => ({
            ...prevCustomData,
            profilePicture,
          }));
          showSnackbar(
            "Profilbild geändert",
            "Du hast dein Profilbild erfolgreich geändert.",
            "success",
          );
        })
        .catch((error: FirebaseError) => {
          const errorCode = error.code;
          const errorMessage = getAuthError(errorCode) || error.message;

          showSnackbar(
            "Profilbild konnte nicht geändert werden",
            errorMessage,
            "error",
          );
        });
    }
  };

  return (
    <>
      <Box>
        <Typography variant="body2">
          Hier kannst du dein Profil deinen Wünschen entsprechend anpassen.
          Erreiche das nächste Level, um mehr Avatare freizuschalten.
        </Typography>

        <Stack pt={3} justifyContent="center">
          <Stack
            direction="row"
            spacing={1}
            width="100%"
            justifyContent="center"
            alignItems="center"
            pb={2}
          >
            <TextField
              label="Benutzername"
              variant="filled"
              value={oldUsername}
              disabled
              sx={{ width: "50%" }}
            />

            <IconButton onClick={() => setIsEditingUsername(true)}>
              <EditRoundedIcon />
            </IconButton>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              label="Passwort"
              variant="filled"
              value="********"
              disabled
              sx={{ width: "50%" }}
            />

            <IconButton onClick={() => setIsEditingPassword(true)}>
              <EditRoundedIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ p: 1 }} />

          <Grid container spacing={2} pt={4}>
            <Grid xs={2} display="flex">
              <Stack spacing={2} alignItems="center">
                <Avatar
                  alt="Profilbild"
                  src={profilePicture}
                  sx={{
                    border: 7,
                    borderColor: theme.palette.primary.main,
                    boxShadow: 3,
                    width: pictureSize,
                    height: pictureSize,
                  }}
                />

                <Button
                  onClick={handleSaveButtonClickProfilePic}
                  disabled={user?.customData.profilePicture === profilePicture}
                >
                  Speichern
                </Button>
              </Stack>
            </Grid>

            <Grid xs>
              <Stack>
                <Typography pb={2}>Wähle einen Avatar aus</Typography>

                <MPMIProfileImageSelector
                  onSelect={(newImage) => setProfilePicture(newImage)}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <MPMIDialog
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
            label="Benutzername"
            type="text"
            disabled
            variant="filled"
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
      </MPMIDialog>

      <MPMIDialog
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
      </MPMIDialog>
    </>
  );
};

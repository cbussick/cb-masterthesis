import { getAuthError } from "@/firebase/authErrors";
import { auth } from "@/firebase/firebase";
import { signInUser } from "@/firebase/signIn";
import { emailRegex } from "@/helpers/regex";
import { useSnackbar } from "@/ui/useSnackbar";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CBDialog } from "../CBDialog/CBDialog";
import { CBLoadingButton } from "../CBLoadingButton/CBLoadingButton";
import {
  CBSignInFormProps,
  CBSignInFormValues,
} from "./CBSignInFormInterfaces";

export const CBSignInForm = ({
  afterSignIn,
}: CBSignInFormProps): JSX.Element => {
  const { showSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CBSignInFormValues>();

  const email = watch("email");
  const password = watch("password");

  const handleSignIn = () => {
    setLoading(true);
    signInUser(email, password, afterSignIn)
      .then(() => {
        showSnackbar(
          "Anmeldung erfolgreich",
          "Du wurdest erfolgreich angemeldet.",
          "success",
        );
      })
      .catch((error: FirebaseError) => {
        const errorMessage = getAuthError(error.code) || error.message;

        setLoading(false);
        showSnackbar("Anmeldung fehlgeschlagen", errorMessage, "error");
      });
  };

  const handleCloseForgotPassword = () => {
    setOpenDialog(false);
  };

  const handleOpenForgotPassword = () => {
    setOpenDialog(true);
  };

  const handleForgotPasswordSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, forgotPasswordEmail)
      .then(() => {
        showSnackbar(
          "E-Mail versendet",
          "Eine E-Mail zum Zurücksetzen deines Passworts wurde gesendet.",
          "success",
        );
        setOpenDialog(false);
      })
      .catch(() => {
        showSnackbar(
          "Fehler beim Zurücksetzen des Passworts",
          "Es konnte kein Nutzer mit dieser E-Mail gefunden werden. Überprüfe die eingegebene E-Mail.",
          "error",
        );
      });
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)} noValidate>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <TextField
            label="E-Mail"
            type="email"
            {...register("email", {
              required: "Bitte gib eine E-Mail-Adresse ein",
              pattern: {
                value: emailRegex,
                message: "Bitte gib eine gültige E-Mail-Adresse ein",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isLoading}
          />

          <TextField
            label="Passwort"
            type="password"
            {...register("password", {
              required: "Bitte gib ein Passwort ein",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isLoading}
          />

          <Button variant="text" onClick={handleOpenForgotPassword}>
            <Typography variant="body2"> Passwort vergessen?</Typography>
          </Button>

          <CBDialog
            isOpen={openDialog}
            onClose={handleCloseForgotPassword}
            title="Passwort zurücksetzen"
          >
            <Stack spacing={1}>
              <Typography>
                Bitte gib deine E-Mail-Adresse ein. Wir senden dir einen Link
                zum Zurücksetzen deines Passworts!
              </Typography>

              <form onSubmit={handleForgotPasswordSubmit}>
                <TextField
                  autoFocus
                  margin="normal"
                  label="E-Mail-Adresse"
                  type="email"
                  fullWidth
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    variant="text"
                    onClick={handleCloseForgotPassword}
                    sx={{
                      pr: 4,
                      color: (t) => t.palette.grey[700],
                      "&:hover": {
                        bgcolor: "transparent",
                        color: (t) => t.palette.primary.main,
                      },
                    }}
                  >
                    Abbrechen
                  </Button>

                  <Button type="submit">Senden</Button>
                </Stack>
              </form>
            </Stack>
          </CBDialog>
        </Stack>

        <CBLoadingButton type="submit" isLoading={isLoading}>
          Anmelden
        </CBLoadingButton>
      </Stack>
    </form>
  );
};

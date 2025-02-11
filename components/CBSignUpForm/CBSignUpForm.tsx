"use client";

import { glossaryEntries } from "@/data/glossaryEntries";
import { getAuthError } from "@/firebase-client/authErrors";
import { signUpUser } from "@/firebase-client/signUpUser";
import { CBUserRole } from "@/firebase-client/userRole";
import { emailRegex, nameRegex, usernameRegex } from "@/helpers/regex";
import { useSnackbar } from "@/ui/useSnackbar";
import { Alert, Stack, TextField } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CBLoadingButton } from "../CBLoadingButton/CBLoadingButton";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  password: string;
}

const firstNameId = "firstName";
const lastNameId = "lastName";
const emailId = "email";
const nameId = "name";
const passwordId = "password";

export const CBSignUpForm = (): JSX.Element => {
  const { showSnackbar } = useSnackbar();

  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormValues>();

  // const firstName = watch(firstNameId);
  // const lastName = watch(lastNameId);
  const email = watch(emailId);
  const name = watch(nameId);
  const password = watch(passwordId);

  const role = CBUserRole.Student;
  const unlockedGlossaryEntryIDs: string[] = glossaryEntries
    .filter((entry) => entry.unlockLevel === 1)
    .map((entry) => entry.id);
  const profilePicture = "";

  const handleSignUp = () => {
    setLoading(true);
    signUpUser(
      // firstName,
      // lastName,
      "test",
      "test",
      email,
      password,
      name,
      role,
      unlockedGlossaryEntryIDs,
      profilePicture,
    )
      .then(() => {
        showSnackbar(
          "Registrierung erfolgreich",
          "Willkommen! Du hast dich erfolgreich registriert.",
          "success",
        );
      })
      .catch((error: FirebaseError) => {
        const errorMessage = getAuthError(error.code) || error.message;

        setLoading(false);
        showSnackbar("Registrierung fehlgeschlagen", errorMessage, "error");
      });
  };

  return (
    <Stack spacing={4} sx={{ mt: 1 }}>
      <form onSubmit={handleSubmit(handleSignUp)} noValidate>
        <Stack spacing={3}>
          <Stack spacing={2}>
            {false && (
              <TextField
                label="Vorname"
                type="text"
                {...register(firstNameId, {
                  required: "Bitte gib deinen Vornamen ein",
                  pattern: {
                    value: nameRegex,
                    message: "Bitte gib einen gültigen Vornamen ein",
                  },
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                disabled={isLoading}
              />
            )}

            {false && (
              <TextField
                label="Nachname"
                type="text"
                {...register(lastNameId, {
                  required: "Bitte gib deinen Nachnamen ein",
                  pattern: {
                    value: nameRegex,
                    message: "Bitte gib einen gültigen Nachnamen ein",
                  },
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                disabled={isLoading}
              />
            )}

            <TextField
              label="E-Mail"
              type="email"
              {...register(emailId, {
                required: "Bitte gib eine E-Mail-Adresse ein",
                pattern: {
                  value: emailRegex,
                  message: "Bitte gib eine gültige E-Mail-Adresse ein",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              // disabled={isLoading}
              disabled
            />

            <TextField
              label="Benutzername"
              type="text"
              {...register(nameId, {
                required: "Bitte gib einen Benutzernamen ein",
                pattern: {
                  value: usernameRegex,
                  message: "Bitte gib einen gültigen Benutzernamen ein",
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              // disabled={isLoading}
              disabled
            />

            <TextField
              label="Passwort"
              type="password"
              {...register(passwordId, {
                required: "Bitte gib ein Passwort ein",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              // disabled={isLoading}
              disabled
            />
          </Stack>

          <Alert severity="info">
            Aktuell können keine neuen Accounts angelegt werden.
          </Alert>

          <CBLoadingButton type="submit" disabled isLoading={isLoading}>
            Registrieren
          </CBLoadingButton>
        </Stack>
      </form>
    </Stack>
  );
};

"use client";

import { getAuthError } from "@/firebase/authErrors";
import { signUpUser } from "@/firebase/signUpUser";
import { MPMIUserRole } from "@/firebase/userRole";
import { emailRegex, nameRegex, usernameRegex } from "@/helpers/regex";
import { useSnackbar } from "@/ui/useSnackbar";
import { Stack, TextField } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { glossaryEntries } from "../MPMIGlossary/MPMIGlossaryEntries";
import { MPMILoadingButton } from "../MPMILoadingButton/MPMILoadingButton";

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

export const MPMISignUpForm = (): JSX.Element => {
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormValues>();

  const firstName = watch(firstNameId);
  const lastName = watch(lastNameId);
  const email = watch(emailId);
  const name = watch(nameId);
  const password = watch(passwordId);

  const role = MPMIUserRole.Student;
  const unlockedGlossaryEntryIDs: string[] = glossaryEntries
    .filter((entry) => entry.unlockLevel === 1)
    .map((entry) => entry.id);
  const profilePicture = "";

  const handleSignUp = () => {
    setIsLoading(true);
    signUpUser(
      firstName,
      lastName,
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
        const errorCode = error.code;
        const errorMessage = getAuthError(errorCode) || error.message;

        setIsLoading(false);
        showSnackbar("Registrierung fehlgeschlagen", errorMessage, "error");
      });
  };

  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit(handleSignUp)} noValidate>
        <Stack spacing={3}>
          <Stack spacing={2}>
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
              disabled={isLoading}
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
              disabled={isLoading}
            />

            <TextField
              label="Passwort"
              type="password"
              {...register(passwordId, {
                required: "Bitte gib ein Passwort ein",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
            />
          </Stack>

          <MPMILoadingButton type="submit" isLoading={isLoading}>
            Registrieren
          </MPMILoadingButton>
        </Stack>
      </form>
    </Stack>
  );
};

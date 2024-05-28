import { MPMISnackbarData } from "@/ui/SnackbarProvider";
import { FirebaseError } from "firebase/app";
import { User, updatePassword } from "firebase/auth";
import { getAuthError } from "./authErrors";

export const changePassword = (
  user: User,
  password: string,
  showSnackbar: MPMISnackbarData["showSnackbar"],
) => {
  updatePassword(user, password)
    .then(() => {
      showSnackbar(
        "Passwort geändert",
        "Du hast dein Passwort geändert.",
        "success",
      );
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
};

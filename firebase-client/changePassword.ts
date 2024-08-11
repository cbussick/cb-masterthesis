import { CBSnackbarData } from "@/ui/SnackbarProvider";
import { FirebaseError } from "firebase/app";
import { User, updatePassword } from "firebase/auth";
import { getAuthError } from "./authErrors";

export const changePassword = (
  user: User,
  password: string,
  showSnackbar: CBSnackbarData["showSnackbar"],
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
      const errorMessage = getAuthError(error.code) || error.message;

      showSnackbar(
        "Passwort konnte nicht geändert werden",
        errorMessage,
        "error",
      );
    });
};

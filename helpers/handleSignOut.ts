import { getAuthError } from "@/firebase/authErrors";
import { signOutUser } from "@/firebase/signOutUser";
import { MPMISnackbarData } from "@/ui/SnackbarProvider";
import { FirebaseError } from "firebase/app";

export const handleSignOut = (
  showSnackbar: MPMISnackbarData["showSnackbar"],
) => {
  signOutUser()
    .then(() => {
      showSnackbar(
        "Abmeldung erfolgreich",
        "Du wurdest erfolgreich abgemeldet.",
        "success",
      );
    })
    .catch((error: FirebaseError) => {
      const errorMessage = getAuthError(error.code) || error.message;

      showSnackbar("Abmeldung fehlgeschlagen", errorMessage, "error");
    });
};

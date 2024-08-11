import { getAuthError } from "@/firebase/client/authErrors";
import { signOutUser } from "@/firebase/client/signOutUser";
import { CBSnackbarData } from "@/ui/SnackbarProvider";
import { FirebaseError } from "firebase/app";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSignOut = (
  showSnackbar: CBSnackbarData["showSnackbar"],
  router: AppRouterInstance,
) => {
  signOutUser()
    .then(() => {
      router.push("/");

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

import { auth } from "./firebase";

export const signOutUser = () => {
  return auth.signOut();
};

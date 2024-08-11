import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signInUser = (
  email: string,
  password: string,
  afterSignIn?: VoidFunction,
) => {
  return signInWithEmailAndPassword(auth, email, password).then(() => {
    if (afterSignIn) {
      afterSignIn();
    }
  });
};

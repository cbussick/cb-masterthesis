import {
  AuthCredential,
  User,
  reauthenticateWithCredential,
} from "firebase/auth";

export const reauthenticateUser = (user: User, credential: AuthCredential) => {
  return reauthenticateWithCredential(user, credential);
};

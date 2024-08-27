import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "./firebase";
import { userCustomDataConverter } from "./userCustomDataConverter";

export type UsersQueryDocumentSnapshot = Awaited<ReturnType<typeof getUsers>>;

export const getUsers = async () => {
  const allUsersQuery = query(collection(firestore, "users")).withConverter(
    userCustomDataConverter,
  );

  const allUsersQuerySnapshot = await getDocs(allUsersQuery);

  return allUsersQuerySnapshot.docs;
};

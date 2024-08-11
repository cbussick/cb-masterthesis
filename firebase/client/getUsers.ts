import { collection, getDocs, query } from "firebase/firestore";
import { userCustomDataConverter } from "./UserCustomDataConverter";
import { firestore } from "./firebase";

export type UsersQueryDocumentSnapshot = Awaited<ReturnType<typeof getUsers>>;

export const getUsers = async () => {
  const allUsersQuery = query(collection(firestore, "users")).withConverter(
    userCustomDataConverter,
  );

  const allUsersQuerySnapshot = await getDocs(allUsersQuery);

  return allUsersQuerySnapshot.docs;
};

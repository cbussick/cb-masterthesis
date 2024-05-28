import { getUserCustomData } from "./getUserCustomData";

export const getUserUnlockedGlossaryEntries = async (uid: string) => {
  const userData = await getUserCustomData(uid);
  return userData.data()?.unlockedGlossaryEntryIDs;
};

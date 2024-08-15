import { useUncertainUser } from "./useUncertainUser";

export const isUserFullyLoaded = (
  user: ReturnType<typeof useUncertainUser>,
) => {
  // Either:
  // - the user AND their custom data is loaded (= logged in)
  // - or the user is loaded and the `user`-object is `null` (= not logged in)
  return (
    (user.isUserLoaded &&
      user.user !== null &&
      user.customData.firstName !== "") ||
    (user.isUserLoaded && user.user === null)
  );
};

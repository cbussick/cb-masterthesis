import { isUserFullyLoaded } from "./isUserFullyLoaded";
import { CBUser } from "./UserProvider";
import { useUncertainUser } from "./useUncertainUser";

// This is a workaround to avoid having to check for nullability of the user object everywhere.
// This hook should only be used when it is guaranteed that the user object is not `null`.
// But this should be the case for anywhere below the `CBMainLayout` component.
export const useUser = (): CBUser => {
  const user = useUncertainUser();

  if (isUserFullyLoaded(user) && user.user && user.user !== null) {
    const fullyLoadedUser: CBUser = {
      user: user.user,
      customData: user.customData,
      topicWorldProgress: user.topicWorldProgress,
      incorrectExercises: user.incorrectExercises,
    };

    return fullyLoadedUser;
  }
  throw new Error(
    "User is not fully loaded. Only use this hook when user is guaranteed to be fully loaded.",
  );
};

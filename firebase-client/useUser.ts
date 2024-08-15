import { useUncertainUser } from "./useUncertainUser";

// This is a workaround to avoid having to check for nullability of the user object everywhere.
// This hook should only be used when it is guaranteed that the user object is not null.
// But this should be the case for anywhere below the `CBMainLayout` component.
export const useUser = () => {
  const user = useUncertainUser();

  if (!user) {
    throw new Error(
      "User is null. Only use this hook when user is guaranteed to be not null.",
    );
  }

  return user;
};

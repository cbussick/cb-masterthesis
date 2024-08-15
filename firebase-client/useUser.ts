import { useUncertainUser } from "./useUncertainUser";

// This is a workaround to avoid having to check for nullability of the user object everywhere.
// This hook should only be used when it is guaranteed that the user object is not null.
// But this should be the case for anywhere below the `CBMainLayout` component.
export const useUser = () => {
  const user = useUncertainUser();
  return user!;
};

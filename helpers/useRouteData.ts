import { usePathname } from "next/navigation";
import { getEnumRecordObjectValueByStringKey } from "./getEnumRecordObjectValueByStringKey";
import { routeMap } from "./routes";

export const useRouteData = () => {
  const pathname = usePathname();

  return getEnumRecordObjectValueByStringKey(routeMap, pathname);
};

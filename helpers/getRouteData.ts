import { usePathname } from "next/navigation";
import { CBRoute, routeMap } from "./routes";

export const useRouteData = () => {
  const pathname = usePathname();

  return routeMap[pathname as CBRoute] === undefined
    ? undefined
    : routeMap[pathname as CBRoute];
};

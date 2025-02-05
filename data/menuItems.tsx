import { CBRoute, routeMap } from "@/helpers/routes";
import {
  BookRounded,
  DashboardRounded,
  MenuBookRounded,
} from "@mui/icons-material";
import { CBSidebarMenuItem } from "../components/CBSidebar/CBSidebarInterfaces";

const makeSidebarMenuItemFromRoute = (
  route: CBRoute,
): Omit<CBSidebarMenuItem, "icon"> => {
  const routeData = routeMap[route];

  return {
    label: routeData.title,
    href: routeData.route,
    forRoles: routeData.forRoles,
  };
};

export const menuItems: CBSidebarMenuItem[] = [
  {
    ...makeSidebarMenuItemFromRoute(CBRoute.Home),
    icon: <DashboardRounded />,
  },
  // {
  //   ...makeSidebarMenuItemFromRoute(CBRoute.Themenwelt),
  //   icon: <PublicRounded />,
  // },
  {
    ...makeSidebarMenuItemFromRoute(CBRoute.FreieUebung),
    icon: <BookRounded />,
  },
  // {
  //   ...makeSidebarMenuItemFromRoute(CBRoute.Pruefungssimulator),
  //   icon: <HourglassFullRounded />,
  // },
  {
    ...makeSidebarMenuItemFromRoute(CBRoute.Glossar),
    icon: <MenuBookRounded />,
  },
  // {
  //   ...makeSidebarMenuItemFromRoute(CBRoute.Achievements),
  //   icon: <EmojiEventsRounded />,
  // },
  // {
  //   ...makeSidebarMenuItemFromRoute(CBRoute.Einstellungen),
  //   icon: <SettingsRounded />,
  // },
];

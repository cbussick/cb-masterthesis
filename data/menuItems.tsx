import { MPMIUserRole } from "@/firebase/userRole";
import { MPMIRoute } from "@/helpers/routes";
import {
  BookRounded,
  DashboardRounded,
  EmojiEventsRounded,
  HourglassFullRounded,
  MenuBookRounded,
  PersonRounded,
  PublicRounded,
  SettingsRounded,
  SportsHandballRounded,
} from "@mui/icons-material";
import { SidebarMenuItem } from "../components/MPMISidebar/MPMISidebarInterfaces";

export const menuItems: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    icon: <DashboardRounded />,
    href: MPMIRoute.Home,
    forRoles: [MPMIUserRole.Admin, MPMIUserRole.Student, MPMIUserRole.Teacher],
  },
  {
    label: "Themenwelt",
    icon: <PublicRounded />,
    href: MPMIRoute.Themenwelt,
    forRoles: [MPMIUserRole.Student],
  },
  {
    label: "Freie Übung",
    icon: <BookRounded />,
    href: MPMIRoute.FreieUebung,
    forRoles: [MPMIUserRole.Student],
  },
  {
    label: "Prüfungssimulator",
    icon: <HourglassFullRounded />,
    href: MPMIRoute.Pruefungssimulator,
    forRoles: [MPMIUserRole.Student],
  },
  {
    label: "Glossar",
    icon: <MenuBookRounded />,
    href: MPMIRoute.Glossar,
    forRoles: [MPMIUserRole.Student],
  },
  {
    label: "Achievements",
    icon: <EmojiEventsRounded />,
    href: MPMIRoute.Achievements,
    forRoles: [MPMIUserRole.Student],
  },
  {
    label: "Einstellungen",
    icon: <SettingsRounded />,
    href: MPMIRoute.Einstellungen,
    forRoles: [MPMIUserRole.Admin, MPMIUserRole.Student, MPMIUserRole.Teacher],
  },
  {
    label: "Admin User Menü",
    icon: <PersonRounded />,
    href: "firestore-test",
    forRoles: [MPMIUserRole.Admin],
  },
  {
    label: "Playground",
    icon: <SportsHandballRounded />,
    href: "playground",
    forRoles: [MPMIUserRole.Admin],
  },
];

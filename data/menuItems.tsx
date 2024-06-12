import { CBUserRole } from "@/firebase/userRole";
import { CBRoute } from "@/helpers/routes";
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
import { SidebarMenuItem } from "../components/CBSidebar/CBSidebarInterfaces";

export const menuItems: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    icon: <DashboardRounded />,
    href: CBRoute.Home,
    forRoles: [CBUserRole.Admin, CBUserRole.Student, CBUserRole.Teacher],
  },
  {
    label: "Themenwelt",
    icon: <PublicRounded />,
    href: CBRoute.Themenwelt,
    forRoles: [CBUserRole.Student],
  },
  {
    label: "Freie Übung",
    icon: <BookRounded />,
    href: CBRoute.FreieUebung,
    forRoles: [CBUserRole.Student],
  },
  {
    label: "Prüfungssimulator",
    icon: <HourglassFullRounded />,
    href: CBRoute.Pruefungssimulator,
    forRoles: [CBUserRole.Student],
  },
  {
    label: "Glossar",
    icon: <MenuBookRounded />,
    href: CBRoute.Glossar,
    forRoles: [CBUserRole.Student],
  },
  {
    label: "Achievements",
    icon: <EmojiEventsRounded />,
    href: CBRoute.Achievements,
    forRoles: [CBUserRole.Student],
  },
  {
    label: "Einstellungen",
    icon: <SettingsRounded />,
    href: CBRoute.Einstellungen,
    forRoles: [CBUserRole.Admin, CBUserRole.Student, CBUserRole.Teacher],
  },
  {
    label: "Admin User Menü",
    icon: <PersonRounded />,
    href: "firestore-test",
    forRoles: [CBUserRole.Admin],
  },
  {
    label: "Playground",
    icon: <SportsHandballRounded />,
    href: "playground",
    forRoles: [CBUserRole.Admin],
  },
];

import { CBUserRole } from "@/firebase/userRole";

export const retryMistakesPathSegment = "wiederholung";

export enum CBRoute {
  Home = "/",
  Themenwelt = "/themenwelt",
  FreieUebung = "/freie-uebung",
  Pruefungssimulator = "/pruefungssimulator",
  Glossar = "/glossar",
  Achievements = "/achievements",
  Einstellungen = "/einstellungen",
}

export interface CBRouteData {
  route: CBRoute;
  title: string;
  subtitle?: string;
  forRoles: CBUserRole[];
}

export const routeMap: Record<CBRoute, CBRouteData> = {
  [CBRoute.Home]: {
    route: CBRoute.Home,
    title: "Dashboard",
    subtitle: "Hier findest du alle wichtigen Informationen auf einen Blick!",
    forRoles: [CBUserRole.Student, CBUserRole.Teacher, CBUserRole.Admin],
  },
  [CBRoute.Themenwelt]: {
    route: CBRoute.Themenwelt,
    title: "Themenwelt",
    subtitle: "Lerne Schritt für Schritt die Welt der Genetik kennen!",
    forRoles: [CBUserRole.Student],
  },
  [CBRoute.FreieUebung]: {
    route: CBRoute.FreieUebung,
    title: "Freie Übung",
    subtitle:
      "Hier kannst du deine Schwächen angehen und dein Wissen verbessern!",
    forRoles: [CBUserRole.Student],
  },
  [CBRoute.Pruefungssimulator]: {
    route: CBRoute.Pruefungssimulator,
    title: "Prüfungssimulator",
    subtitle:
      "Hier kannst du dein bisheriges Wissen testen. Bereite dich mit diesem Simulator gezielt auf die Prüfung vor.",
    forRoles: [CBUserRole.Student],
  },
  [CBRoute.Glossar]: {
    route: CBRoute.Glossar,
    title: "Glossar",
    subtitle: "Hier kannst du alle wichtigen Begriffe der Genetik nachschlagen",
    forRoles: [CBUserRole.Teacher],
  },
  [CBRoute.Achievements]: {
    route: CBRoute.Achievements,
    title: "Achievements",
    subtitle:
      "Entdecke eine Vielfalt von Achievements, von grundlegenden Meilensteinen bis hin zu anspruchsvollen Herausforderungen. ",
    forRoles: [CBUserRole.Student],
  },
  [CBRoute.Einstellungen]: {
    route: CBRoute.Einstellungen,
    title: "Einstellungen",
    subtitle: "Hier siehst du deine Einstellungen der App",
    forRoles: [CBUserRole.Student, CBUserRole.Teacher, CBUserRole.Admin],
  },
};

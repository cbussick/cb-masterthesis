import { MPMIUserRole } from "@/firebase/userRole";

export const retryMistakesPathSegment = "wiederholung";

export enum MPMIRoute {
  Home = "/",
  Themenwelt = "/themenwelt",
  FreieUebung = "/freie-uebung",
  Pruefungssimulator = "/pruefungssimulator",
  Glossar = "/glossar",
  Achievements = "/achievements",
  Einstellungen = "/einstellungen",
}

export interface MPMIRouteData {
  route: MPMIRoute;
  title?: string;
  subtitle?: string;
  forRoles: MPMIUserRole[];
}

export const routeMap: Record<MPMIRoute, MPMIRouteData> = {
  [MPMIRoute.Home]: {
    route: MPMIRoute.Home,
    title: "Dashboard",
    subtitle: "Hier findest du alle wichtigen Informationen auf einen Blick!",
    forRoles: [MPMIUserRole.Student, MPMIUserRole.Teacher, MPMIUserRole.Admin],
  },
  [MPMIRoute.Themenwelt]: {
    route: MPMIRoute.Themenwelt,
    title: "Themenwelt",
    subtitle: "Lerne Schritt für Schritt die Welt der Genetik kennen!",
    forRoles: [MPMIUserRole.Student],
  },
  [MPMIRoute.FreieUebung]: {
    route: MPMIRoute.FreieUebung,
    title: "Freie Übung",
    subtitle:
      "Hier kannst du deine Schwächen angehen und dein Wissen verbessern!",
    forRoles: [MPMIUserRole.Student],
  },
  [MPMIRoute.Pruefungssimulator]: {
    route: MPMIRoute.Pruefungssimulator,
    title: "Prüfungssimulator",
    subtitle:
      "Hier kannst du dein bisheriges Wissen testen. Bereite dich mit diesem Simulator gezielt auf die Prüfung vor.",
    forRoles: [MPMIUserRole.Student],
  },
  [MPMIRoute.Glossar]: {
    route: MPMIRoute.Glossar,
    title: "Glossar",
    subtitle: "Hier kannst du alle wichtigen Begriffe der Genetik nachschlagen",
    forRoles: [MPMIUserRole.Student],
  },
  [MPMIRoute.Achievements]: {
    route: MPMIRoute.Achievements,
    title: "Achievements",
    subtitle:
      "Entdecke eine Vielfalt von Achievements, von grundlegenden Meilensteinen bis hin zu anspruchsvollen Herausforderungen. ",
    forRoles: [MPMIUserRole.Student],
  },
  [MPMIRoute.Einstellungen]: {
    route: MPMIRoute.Einstellungen,
    title: "Einstellungen",
    subtitle: "Hier siehst du deine Einstellungen der App",
    forRoles: [MPMIUserRole.Student, MPMIUserRole.Teacher, MPMIUserRole.Admin],
  },
};

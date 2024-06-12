import { CBUserRole } from "@/firebase/userRole";

export interface CBSidebarProps {
  sidebarWidthOpen: number;
  sidebarWidthClosed: number;
  sidebarHorizontalSpacing: number;
}

export type SidebarMenuItem = {
  label: string;
  icon: JSX.Element;
  href: string;
  forRoles: CBUserRole[];
};

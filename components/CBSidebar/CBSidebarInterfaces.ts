import { CBUserRole } from "@/firebase/client/userRole";

export interface CBSidebarProps {
  sidebarWidthOpen: number;
  sidebarWidthClosed: number;
  sidebarHorizontalSpacing: number;
}

export type CBSidebarMenuItem = {
  label: string;
  icon: JSX.Element;
  href: string;
  forRoles: CBUserRole[];
};

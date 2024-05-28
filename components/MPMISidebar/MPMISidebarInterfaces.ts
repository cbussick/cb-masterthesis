import { MPMIUserRole } from "@/firebase/userRole";

export interface MPMISidebarProps {
  sidebarWidthOpen: number;
  sidebarWidthClosed: number;
  sidebarHorizontalSpacing: number;
}

export type SidebarMenuItem = {
  label: string;
  icon: JSX.Element;
  href: string;
  forRoles: MPMIUserRole[];
};

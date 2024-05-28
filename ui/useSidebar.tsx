import { useContext } from "react";
import { SidebarContext } from "./SidebarProvider";

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  return context;
};

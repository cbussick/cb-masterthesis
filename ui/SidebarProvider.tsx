"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

interface SidebarProviderProps {
  children: ReactNode;
}

interface Sidebar {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleIsOpen: VoidFunction;
}

const defaultSidebar: Sidebar = {
  isOpen: false,
  setOpen: () => {},
  toggleIsOpen: () => {},
};

export const SidebarContext = createContext<Sidebar>(defaultSidebar);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(defaultSidebar.isOpen);

  return useMemo(
    () => (
      <SidebarContext.Provider
        value={{
          isOpen,
          setOpen,
          toggleIsOpen: () => setOpen((open) => !open),
        }}
      >
        {children}
      </SidebarContext.Provider>
    ),
    [children, isOpen],
  );
};

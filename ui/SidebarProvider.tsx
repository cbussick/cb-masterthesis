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
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleIsOpen: VoidFunction;
}

const defaultSidebar: Sidebar = {
  isOpen: false,
  setIsOpen: () => {},
  toggleIsOpen: () => {},
};

export const SidebarContext = createContext<Sidebar>(defaultSidebar);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultSidebar.isOpen);

  return useMemo(
    () => (
      <SidebarContext.Provider
        value={{
          isOpen,
          setIsOpen,
          toggleIsOpen: () => setIsOpen((open) => !open),
        }}
      >
        {children}
      </SidebarContext.Provider>
    ),
    [children, isOpen],
  );
};

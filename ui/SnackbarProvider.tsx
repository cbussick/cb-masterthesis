"use client";

import { CBSnackbarProps } from "@/components/CBSnackbar/CBSnackbarInterfaces";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

interface SnackbarProviderProps {
  children: ReactNode;
}

export interface CBSnackbarData {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: CBSnackbarProps["title"];
  message: CBSnackbarProps["message"];
  severity: CBSnackbarProps["severity"];
  showSnackbar: (
    title: string,
    message: string,
    severity: CBSnackbarProps["severity"],
  ) => void;
}

const defaultSnackbar: CBSnackbarData = {
  isOpen: false,
  setOpen: () => {},
  title: "",
  message: "",
  severity: undefined,
  showSnackbar: () => {},
};

export const SnackbarContext = createContext<CBSnackbarData>(defaultSnackbar);

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(defaultSnackbar.isOpen);
  const [title, setTitle] = useState<ReactNode>(defaultSnackbar.title);
  const [message, setMessage] = useState<ReactNode>(defaultSnackbar.message);
  const [severity, setSeverity] = useState<CBSnackbarData["severity"]>(
    defaultSnackbar.severity,
  );

  const showSnackbar = (
    snackbarTitle: string,
    snackbarMessage: string,
    snackbarSeverity: CBSnackbarProps["severity"],
  ) => {
    setTitle(snackbarTitle);
    setMessage(snackbarMessage);
    setSeverity(snackbarSeverity);
    setOpen(true);
  };

  return useMemo(
    () => (
      <SnackbarContext.Provider
        value={{
          isOpen,
          setOpen,
          title,
          message,
          severity,
          showSnackbar,
        }}
      >
        {children}
      </SnackbarContext.Provider>
    ),
    [children, isOpen, message, severity, title],
  );
};

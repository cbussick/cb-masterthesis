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
  toggleOpen: VoidFunction;
  title: CBSnackbarProps["title"];
  setTitle: (title: string) => void;
  message: CBSnackbarProps["message"];
  setMessage: (message: string) => void;
  severity: CBSnackbarProps["severity"];
  setSeverity: (severity: CBSnackbarProps["severity"]) => void;
  showSnackbar: (
    title: string,
    message: string,
    severity: CBSnackbarProps["severity"],
  ) => void;
}

const defaultSnackbar: CBSnackbarData = {
  isOpen: false,
  setOpen: () => {},
  toggleOpen: () => {},
  title: "",
  setTitle: () => {},
  message: "",
  setMessage: () => {},
  severity: undefined,
  setSeverity: () => {},
  showSnackbar: () => {},
};

export const SnackbarContext = createContext<CBSnackbarData>(defaultSnackbar);

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(defaultSnackbar.isOpen);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<CBSnackbarData["severity"]>();

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
          toggleOpen: () => setOpen((open) => !open),
          title,
          setTitle,
          message,
          setMessage,
          severity,
          setSeverity,
          showSnackbar,
        }}
      >
        {children}
      </SnackbarContext.Provider>
    ),
    [children, isOpen, message, severity, title],
  );
};

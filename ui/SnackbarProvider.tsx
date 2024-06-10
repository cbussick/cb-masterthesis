"use client";

import { MPMISnackbarProps } from "@/components/MPMISnackbar/MPMISnackbarInterfaces";
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

export interface MPMISnackbarData {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: VoidFunction;
  title: MPMISnackbarProps["title"];
  setTitle: (title: string) => void;
  message: MPMISnackbarProps["message"];
  setMessage: (message: string) => void;
  severity: MPMISnackbarProps["severity"];
  setSeverity: (severity: MPMISnackbarProps["severity"]) => void;
  showSnackbar: (
    title: string,
    message: string,
    severity: MPMISnackbarProps["severity"],
  ) => void;
}

const defaultSnackbar: MPMISnackbarData = {
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

export const SnackbarContext = createContext<MPMISnackbarData>(defaultSnackbar);

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(defaultSnackbar.isOpen);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<MPMISnackbarData["severity"]>();

  const showSnackbar = (
    snackbarTitle: string,
    snackbarMessage: string,
    snackbarSeverity: MPMISnackbarProps["severity"],
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

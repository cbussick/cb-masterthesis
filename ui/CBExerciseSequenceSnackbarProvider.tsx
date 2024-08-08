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

interface CBExerciseSequenceSnackbarProviderProps {
  children: ReactNode;
}

export interface CBExerciseSequenceSnackbarData {
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

const defaultSnackbar: CBExerciseSequenceSnackbarData = {
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

export const CBExerciseSequenceSnackbarContext =
  createContext<CBExerciseSequenceSnackbarData>(defaultSnackbar);

export const CBExerciseSequenceSnackbarProvider = ({
  children,
}: CBExerciseSequenceSnackbarProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(defaultSnackbar.isOpen);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] =
    useState<CBExerciseSequenceSnackbarData["severity"]>();

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
      <CBExerciseSequenceSnackbarContext.Provider
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
      </CBExerciseSequenceSnackbarContext.Provider>
    ),
    [children, isOpen, message, severity, title],
  );
};

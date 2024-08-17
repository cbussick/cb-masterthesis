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
  title: CBSnackbarProps["title"];
  message: CBSnackbarProps["message"];
  severity: CBSnackbarProps["severity"];
  showSnackbar: (
    title: string,
    message: string,
    severity: CBSnackbarProps["severity"],
  ) => void;
}

const defaultSnackbar: CBExerciseSequenceSnackbarData = {
  isOpen: false,
  setOpen: () => {},
  title: "",
  message: "",
  severity: undefined,
  showSnackbar: () => {},
};

export const CBExerciseSequenceSnackbarContext =
  createContext<CBExerciseSequenceSnackbarData>(defaultSnackbar);

export const CBExerciseSequenceSnackbarProvider = ({
  children,
}: CBExerciseSequenceSnackbarProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(defaultSnackbar.isOpen);
  const [title, setTitle] = useState<ReactNode>(defaultSnackbar.title);
  const [message, setMessage] = useState<ReactNode>(defaultSnackbar.message);
  const [severity, setSeverity] = useState<
    CBExerciseSequenceSnackbarData["severity"]
  >(defaultSnackbar.severity);

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
          title,
          message,
          severity,
          showSnackbar,
        }}
      >
        {children}
      </CBExerciseSequenceSnackbarContext.Provider>
    ),
    [children, isOpen, message, severity, title],
  );
};

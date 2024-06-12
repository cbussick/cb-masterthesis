"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

interface CBConfettiProviderProps {
  children: ReactNode;
}

interface CBConfettiType {
  isConfettiComplete: boolean;
  setConfettiComplete: Dispatch<SetStateAction<boolean>>;
  startConfetti: VoidFunction;
}

const defaultConfetti: CBConfettiType = {
  isConfettiComplete: true,
  setConfettiComplete: () => {},
  startConfetti: () => {},
};

export const CBConfettiContext = createContext<CBConfettiType>(defaultConfetti);

export const CBConfettiProvider = ({ children }: CBConfettiProviderProps) => {
  const [isConfettiComplete, setConfettiComplete] = useState<boolean>(
    defaultConfetti.isConfettiComplete,
  );

  return useMemo(
    () => (
      <CBConfettiContext.Provider
        value={{
          isConfettiComplete,
          setConfettiComplete,
          startConfetti: () => setConfettiComplete(false),
        }}
      >
        {children}
      </CBConfettiContext.Provider>
    ),
    [children, isConfettiComplete],
  );
};

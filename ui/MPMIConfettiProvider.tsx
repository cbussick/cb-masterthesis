"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

interface MPMIConfettiProviderProps {
  children: ReactNode;
}

interface MPMIConfettiType {
  isConfettiComplete: boolean;
  setConfettiComplete: Dispatch<SetStateAction<boolean>>;
  startConfetti: VoidFunction;
}

const defaultConfetti: MPMIConfettiType = {
  isConfettiComplete: true,
  setConfettiComplete: () => {},
  startConfetti: () => {},
};

export const MPMIConfettiContext =
  createContext<MPMIConfettiType>(defaultConfetti);

export const MPMIConfettiProvider = ({
  children,
}: MPMIConfettiProviderProps) => {
  const [isConfettiComplete, setConfettiComplete] = useState<boolean>(
    defaultConfetti.isConfettiComplete,
  );

  return useMemo(
    () => (
      <MPMIConfettiContext.Provider
        value={{
          isConfettiComplete,
          setConfettiComplete,
          startConfetti: () => setConfettiComplete(false),
        }}
      >
        {children}
      </MPMIConfettiContext.Provider>
    ),
    [children, isConfettiComplete],
  );
};

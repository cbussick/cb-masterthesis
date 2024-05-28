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
  setIsConfettiComplete: Dispatch<SetStateAction<boolean>>;
  startConfetti: VoidFunction;
}

const defaultConfetti: MPMIConfettiType = {
  isConfettiComplete: true,
  setIsConfettiComplete: () => {},
  startConfetti: () => {},
};

export const MPMIConfettiContext =
  createContext<MPMIConfettiType>(defaultConfetti);

export const MPMIConfettiProvider = ({
  children,
}: MPMIConfettiProviderProps) => {
  const [isConfettiComplete, setIsConfettiComplete] = useState<boolean>(
    defaultConfetti.isConfettiComplete,
  );

  return useMemo(
    () => (
      <MPMIConfettiContext.Provider
        value={{
          isConfettiComplete,
          setIsConfettiComplete,
          startConfetti: () => setIsConfettiComplete(false),
        }}
      >
        {children}
      </MPMIConfettiContext.Provider>
    ),
    [children, isConfettiComplete],
  );
};

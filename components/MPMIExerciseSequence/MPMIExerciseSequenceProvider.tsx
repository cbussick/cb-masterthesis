"use client";

import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { MPMIExerciseSequenceType } from "./MPMIExerciseSequenceWrapperInterfaces";

interface MPMIExerciseSequenceProviderProps {
  children: ReactNode;
}

interface MPMIExerciseSequenceDataType {
  type: MPMIExerciseSequenceType;
  setType: Dispatch<SetStateAction<MPMIExerciseSequenceType>>;
  exercises: MPMIExerciseWithMetaData[];
  setExercises: Dispatch<SetStateAction<MPMIExerciseWithMetaData[]>>;
  currentExerciseIndex: number;
  setCurrentExerciseIndex: Dispatch<SetStateAction<number>>;
  /**
   * Whether the current exercise is finished. Not necessarily correctly.
   */
  isCurrentExerciseFinished: boolean;
  setCurrentExerciseFinished: Dispatch<SetStateAction<boolean>>;
}

const defaultExerciseSequence: MPMIExerciseSequenceDataType = {
  type: MPMIExerciseSequenceType.FreePractice,
  setType: () => {},
  exercises: [],
  setExercises: () => {},
  currentExerciseIndex: 0,
  setCurrentExerciseIndex: () => {},
  isCurrentExerciseFinished: false,
  setCurrentExerciseFinished: () => {},
};

export const MPMIExerciseSequenceContext =
  createContext<MPMIExerciseSequenceDataType>(defaultExerciseSequence);

export const MPMIExerciseSequenceProvider = ({
  children,
}: MPMIExerciseSequenceProviderProps) => {
  const [type, setType] = useState<MPMIExerciseSequenceType>(
    defaultExerciseSequence.type,
  );
  const [exercises, setExercises] = useState<MPMIExerciseWithMetaData[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(
    defaultExerciseSequence.currentExerciseIndex,
  );
  const [isCurrentExerciseFinished, setCurrentExerciseFinished] =
    useState<boolean>(false);

  return useMemo(
    () => (
      <MPMIExerciseSequenceContext.Provider
        value={{
          type,
          setType,
          exercises,
          setExercises,
          currentExerciseIndex,
          setCurrentExerciseIndex,
          isCurrentExerciseFinished,
          setCurrentExerciseFinished,
        }}
      >
        {children}
      </MPMIExerciseSequenceContext.Provider>
    ),
    [
      children,
      currentExerciseIndex,
      exercises,
      isCurrentExerciseFinished,
      type,
    ],
  );
};

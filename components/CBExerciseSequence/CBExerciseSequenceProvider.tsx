"use client";

import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { CBExerciseSequenceType } from "./CBExerciseSequenceWrapperInterfaces";

interface CBExerciseSequenceProviderProps {
  children: ReactNode;
}

interface CBExerciseSequenceDataType {
  type: CBExerciseSequenceType;
  setType: Dispatch<SetStateAction<CBExerciseSequenceType>>;
  exercises: CBExerciseWithMetaData[];
  setExercises: Dispatch<SetStateAction<CBExerciseWithMetaData[]>>;
  currentExerciseIndex: number;
  setCurrentExerciseIndex: Dispatch<SetStateAction<number>>;
  /**
   * Whether the current exercise is finished. Not necessarily correctly.
   */
  isCurrentExerciseFinished: boolean;
  setCurrentExerciseFinished: Dispatch<SetStateAction<boolean>>;
}

const defaultExerciseSequence: CBExerciseSequenceDataType = {
  type: CBExerciseSequenceType.FreePractice,
  setType: () => {},
  exercises: [],
  setExercises: () => {},
  currentExerciseIndex: 0,
  setCurrentExerciseIndex: () => {},
  isCurrentExerciseFinished: false,
  setCurrentExerciseFinished: () => {},
};

export const CBExerciseSequenceContext =
  createContext<CBExerciseSequenceDataType>(defaultExerciseSequence);

export const CBExerciseSequenceProvider = ({
  children,
}: CBExerciseSequenceProviderProps) => {
  const [type, setType] = useState<CBExerciseSequenceType>(
    defaultExerciseSequence.type,
  );
  const [exercises, setExercises] = useState<CBExerciseWithMetaData[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(
    defaultExerciseSequence.currentExerciseIndex,
  );
  const [isCurrentExerciseFinished, setCurrentExerciseFinished] =
    useState<boolean>(false);

  return useMemo(
    () => (
      <CBExerciseSequenceContext.Provider
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
      </CBExerciseSequenceContext.Provider>
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

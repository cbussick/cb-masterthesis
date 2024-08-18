"use client";

import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { dayjsLocalized } from "@/helpers/time-tracking/dayjsLocalized";
import { Dayjs } from "dayjs";
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
  type: CBExerciseSequenceType;
  beginTime: Dayjs;
}

interface CBExerciseSequenceDataType {
  type: CBExerciseSequenceType;
  exercises: CBExerciseWithMetaData[];
  setExercises: Dispatch<SetStateAction<CBExerciseWithMetaData[]>>;
  currentExerciseIndex: number;
  setCurrentExerciseIndex: Dispatch<SetStateAction<number>>;
  /**
   * Whether the current exercise is finished. Can be correctly or incorrectly finished.
   */
  isCurrentExerciseFinished: boolean;
  setCurrentExerciseFinished: Dispatch<SetStateAction<boolean>>;
  beginTime: Dayjs;
}

const defaultExerciseSequence: CBExerciseSequenceDataType = {
  type: CBExerciseSequenceType.FreePractice,
  exercises: [],
  setExercises: () => {},
  currentExerciseIndex: 0,
  setCurrentExerciseIndex: () => {},
  isCurrentExerciseFinished: false,
  setCurrentExerciseFinished: () => {},
  beginTime: dayjsLocalized(),
};

export const CBExerciseSequenceContext =
  createContext<CBExerciseSequenceDataType>(defaultExerciseSequence);

export const CBExerciseSequenceProvider = ({
  children,
  type,
  beginTime,
}: CBExerciseSequenceProviderProps) => {
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
          exercises,
          setExercises,
          currentExerciseIndex,
          setCurrentExerciseIndex,
          isCurrentExerciseFinished,
          setCurrentExerciseFinished,
          beginTime,
        }}
      >
        {children}
      </CBExerciseSequenceContext.Provider>
    ),
    [
      beginTime,
      children,
      currentExerciseIndex,
      exercises,
      isCurrentExerciseFinished,
      type,
    ],
  );
};

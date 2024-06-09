"use client";

import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import { addCompletedExamsToUser } from "@/firebase/addCompletedExamsToUser";
import { addPointsToUser } from "@/firebase/addPointsToUser";
import { useUser } from "@/firebase/useUser";
import { MPMIRoute, routeMap } from "@/helpers/routes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MPMITime } from "../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";
import { MPMIPageHeader } from "../MPMIPageHeader/MPMIPageHeader";
import { MPMIExamSimulatorEndScreen } from "./MPMIExamSimulatorEndScreen/MPMIExamSimulatorEndScreen";
import { MPMIExamSimulatorHome } from "./MPMIExamSimulatorHome/MPMIExamSimulatorHome";
import {
  MPMIExamSimulatorProps,
  MPMIExamSimulatorState,
  MPMIExerciseWithCorrectness,
} from "./MPMIExamSimulatorInterfaces";
import { MPMIExamSimulatorSequence } from "./MPMIExamSimulatorSequence/MPMIExamSimulatorSequence";

const pointsForSuccessfulExam = 5;

export const MPMIExamSimulator = ({
  exams,
}: MPMIExamSimulatorProps): JSX.Element => {
  const user = useUser();
  const completedExamAmount = user?.customData.completedExams || 0;
  const [examState, setExamState] = useState<MPMIExamSimulatorState>(
    MPMIExamSimulatorState.NotStarted,
  );
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);

  const [originalExercises, setOriginalExercises] = useState<
    MPMIExerciseWithMetaData[]
  >([]);

  const [exercises, setExercises] = useState<MPMIExerciseWithCorrectness[]>([]);

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const [completionTime, setCompletionTime] = useState<MPMITime>({
    sec: 0,
    min: 0,
  });

  const resetExercises = useCallback(
    (failedExercises: MPMIExerciseWithCorrectness[]) => {
      if (failedExercises.length === 0) {
        const preparedOriginalExercises: MPMIExerciseWithMetaData[] = exams[
          currentExamIndex
        ].exercises.map((exercise) => {
          return {
            ...exercise,
            isCompleted: false,
          };
        });
        setOriginalExercises(preparedOriginalExercises);

        const preparedExercises: MPMIExerciseWithCorrectness[] = exams[
          currentExamIndex
        ].exercises.map((exercise) => {
          return {
            ...exercise,
            isCorrect: false,
          };
        });

        setExercises(preparedExercises);
      } else {
        const preparedFalseExercises: MPMIExerciseWithMetaData[] =
          failedExercises.map((exercise) => {
            return {
              ...exercise,
              isCompleted: false,
            };
          });

        setOriginalExercises(preparedFalseExercises);
        setExercises(failedExercises);
      }
    },
    [currentExamIndex, exams],
  );

  useEffect(() => {
    resetExercises([]);
  }, [currentExamIndex, resetExercises]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      const failedExercises = exercises.filter((e) => !e.isCorrect);
      resetExercises(failedExercises);
    }
  }, [exercises, isFirstRender, resetExercises]);

  const onSequenceComplete = useCallback(() => {
    setExamState(MPMIExamSimulatorState.Finished);
    if (user?.user) {
      addCompletedExamsToUser(user.user.uid, 1);

      const correctExercisesAmount = exercises.filter(
        (e) => e.isCorrect,
      ).length;
      if (correctExercisesAmount >= exercises.length / 2) {
        const pointsToAdd = correctExercisesAmount + pointsForSuccessfulExam;
        addPointsToUser(user.user.uid, pointsToAdd);
      }
    }
  }, [exercises, user]);

  const onCancel = useCallback(() => {
    setExamState(MPMIExamSimulatorState.NotStarted);
    resetExercises([]);
  }, [resetExercises]);

  const examSimulatorSequenceComponent = useMemo(
    () => (
      <MPMIExamSimulatorSequence
        originalExercises={originalExercises}
        setExercises={setExercises}
        onSequenceComplete={onSequenceComplete}
        setCompletionTime={setCompletionTime}
        onCancel={onCancel}
      />
    ),
    [originalExercises, onSequenceComplete, onCancel],
  );

  let content: JSX.Element | null = null;

  if (examState === MPMIExamSimulatorState.NotStarted) {
    let amountFinishedExercisesText = `${completedExamAmount}`;
    if (completedExamAmount === 0) {
      amountFinishedExercisesText = "Keine";
    }

    content = (
      <MPMIExamSimulatorHome
        titleTop={`${amountFinishedExercisesText} ${
          completedExamAmount !== 1 ? "Prüfungen" : "Prüfung"
        } bisher abgeschlossen`}
        titleCard="Beginne die Prüfungssimulation"
        setExamState={setExamState}
      />
    );
  }
  if (examState === MPMIExamSimulatorState.Started) {
    content = examSimulatorSequenceComponent;
  }

  const onRetry = (failedExercises: MPMIExerciseWithCorrectness[]) => {
    setIsFirstRender(true);
    setExamState(MPMIExamSimulatorState.Started);
    resetExercises(failedExercises);
  };

  const onStartNewExam = () => {
    setExamState(MPMIExamSimulatorState.NotStarted);
    setCurrentExamIndex((prevIndex) =>
      prevIndex < exams.length - 1 ? prevIndex + 1 : 0,
    );
  };

  if (examState === MPMIExamSimulatorState.Finished) {
    content = (
      <MPMIExamSimulatorEndScreen
        exercises={exercises}
        completionTime={completionTime}
        onRetry={onRetry}
        onStartNewExam={onStartNewExam}
      />
    );
  }

  return (
    <>
      <MPMIPageHeader
        title={routeMap[MPMIRoute.Pruefungssimulator].title}
        subTitle={
          examState === MPMIExamSimulatorState.NotStarted
            ? routeMap[MPMIRoute.Pruefungssimulator].subtitle
            : undefined
        }
      />

      {content}
    </>
  );
};

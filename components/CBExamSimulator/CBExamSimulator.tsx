"use client";

import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { addCompletedExamsToUser } from "@/firebase-client/addCompletedExamsToUser";
import { addPointsToUser } from "@/firebase-client/addPointsToUser";
import { useUser } from "@/firebase-client/useUser";
import { CBRoute, routeMap } from "@/helpers/routes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CBTime } from "../CBExerciseTimer/CBExerciseTimerInterfaces";
import { CBPageHeader } from "../CBPageHeader/CBPageHeader";
import { CBExamSimulatorEndScreen } from "./CBExamSimulatorEndScreen/CBExamSimulatorEndScreen";
import { CBExamSimulatorHome } from "./CBExamSimulatorHome/CBExamSimulatorHome";
import {
  CBExamSimulatorProps,
  CBExamSimulatorState,
  CBExerciseWithCorrectness,
} from "./CBExamSimulatorInterfaces";
import { CBExamSimulatorSequence } from "./CBExamSimulatorSequence/CBExamSimulatorSequence";

const pointsForSuccessfulExam = 5;

export const CBExamSimulator = ({
  exams,
}: CBExamSimulatorProps): JSX.Element => {
  const user = useUser();
  const completedExamAmount = user.customData.completedExams;
  const [examState, setExamState] = useState<CBExamSimulatorState>(
    CBExamSimulatorState.NotStarted,
  );
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);

  const [originalExercises, setOriginalExercises] = useState<
    CBExerciseWithMetaData[]
  >([]);

  const [exercises, setExercises] = useState<CBExerciseWithCorrectness[]>([]);

  const [isFirstRender, setFirstRender] = useState<boolean>(true);

  const [completionTime, setCompletionTime] = useState<CBTime>({
    sec: 0,
    min: 0,
  });

  const resetExercises = useCallback(
    (failedExercises: CBExerciseWithCorrectness[]) => {
      if (failedExercises.length === 0) {
        const preparedOriginalExercises: CBExerciseWithMetaData[] = exams[
          currentExamIndex
        ].exercises.map((exercise) => {
          return {
            ...exercise,
            isCompleted: false,
          };
        });
        setOriginalExercises(preparedOriginalExercises);

        const preparedExercises: CBExerciseWithCorrectness[] = exams[
          currentExamIndex
        ].exercises.map((exercise) => {
          return {
            ...exercise,
            isCorrect: false,
          };
        });

        setExercises(preparedExercises);
      } else {
        const preparedFalseExercises: CBExerciseWithMetaData[] =
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
      setFirstRender(false);
      const failedExercises = exercises.filter((e) => !e.isCorrect);
      resetExercises(failedExercises);
    }
  }, [exercises, isFirstRender, resetExercises]);

  const onSequenceComplete = useCallback(() => {
    setExamState(CBExamSimulatorState.Finished);
    if (user.user) {
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
    setExamState(CBExamSimulatorState.NotStarted);
    resetExercises([]);
  }, [resetExercises]);

  const examSimulatorSequenceComponent = useMemo(
    () => (
      <CBExamSimulatorSequence
        exercises={originalExercises}
        setExercises={setExercises}
        onSequenceComplete={onSequenceComplete}
        setCompletionTime={setCompletionTime}
        onCancel={onCancel}
      />
    ),
    [originalExercises, onSequenceComplete, onCancel],
  );

  let content: JSX.Element | null = null;

  if (examState === CBExamSimulatorState.NotStarted) {
    let amountFinishedExercisesText = `${completedExamAmount}`;
    if (completedExamAmount === 0) {
      amountFinishedExercisesText = "Keine";
    }

    content = (
      <CBExamSimulatorHome
        titleTop={`${amountFinishedExercisesText} ${
          completedExamAmount !== 1 ? "Prüfungen" : "Prüfung"
        } bisher abgeschlossen`}
        titleCard="Beginne die Prüfungssimulation"
        setExamState={setExamState}
      />
    );
  }
  if (examState === CBExamSimulatorState.Started) {
    content = examSimulatorSequenceComponent;
  }

  const onRetry = (failedExercises: CBExerciseWithCorrectness[]) => {
    setFirstRender(true);
    setExamState(CBExamSimulatorState.Started);
    resetExercises(failedExercises);
  };

  const onStartNewExam = () => {
    setExamState(CBExamSimulatorState.NotStarted);
    setCurrentExamIndex((prevIndex) =>
      prevIndex < exams.length - 1 ? prevIndex + 1 : 0,
    );
  };

  if (examState === CBExamSimulatorState.Finished) {
    content = (
      <CBExamSimulatorEndScreen
        exercises={exercises}
        completionTime={completionTime}
        onRetry={onRetry}
        onStartNewExam={onStartNewExam}
      />
    );
  }

  return (
    <>
      <CBPageHeader
        title={routeMap[CBRoute.Pruefungssimulator].title}
        subTitle={
          examState === CBExamSimulatorState.NotStarted
            ? routeMap[CBRoute.Pruefungssimulator].subtitle
            : undefined
        }
      />

      {content}
    </>
  );
};

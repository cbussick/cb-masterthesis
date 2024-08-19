"use client";

import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBUserCustomData } from "@/firebase-client/UserCustomDataConverter";
import { makeUpdatedTrackedTime } from "@/firebase-client/makeUpdatedTrackedTime";
import { updateUser } from "@/firebase-client/updateUser";
import { useUser } from "@/firebase-client/useUser";
import { CBRoute, routeMap } from "@/helpers/routes";
import { dayjsLocalized } from "@/helpers/time-tracking/dayjsLocalized";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const { user, customData } = useUser();
  const completedExamAmount = customData.completedExams;
  const [examState, setExamState] = useState<CBExamSimulatorState>(
    CBExamSimulatorState.NotStarted,
  );
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);

  const [originalExercises, setOriginalExercises] = useState<
    CBExerciseWithMetaData[]
  >([]);

  const [exercises, setExercises] = useState<CBExerciseWithCorrectness[]>([]);

  const [isFirstRender, setFirstRender] = useState<boolean>(true);

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

  const beginTime = useMemo(() => dayjsLocalized(), []);

  const onSequenceComplete = useCallback(() => {
    setExamState(CBExamSimulatorState.Finished);
    const userNewData: Partial<CBUserCustomData> = {};

    userNewData.completedExams = customData.completedExams + 1;

    const endTime = dayjsLocalized();

    userNewData.trackedTime = makeUpdatedTrackedTime(
      beginTime,
      endTime,
      customData,
    );

    const correctExercisesAmount = exercises.filter((e) => e.isCorrect).length;
    if (correctExercisesAmount >= exercises.length / 2) {
      const pointsToAdd = correctExercisesAmount + pointsForSuccessfulExam;
      userNewData.points = customData.points + pointsToAdd;
    }

    updateUser(user.uid, userNewData);
  }, [beginTime, customData, exercises, user.uid]);

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
        onCancel={onCancel}
        beginTime={beginTime}
      />
    ),
    [originalExercises, onSequenceComplete, onCancel, beginTime],
  );

  let content: JSX.Element | null = null;

  if (examState === CBExamSimulatorState.NotStarted) {
    const amountFinishedExercisesText =
      completedExamAmount === 0 ? "Keine" : `${completedExamAmount}`;

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
    const endTime = dayjsLocalized();
    const passedSeconds = endTime.diff(beginTime, "second");

    content = (
      <CBExamSimulatorEndScreen
        exercises={exercises}
        passedSeconds={passedSeconds}
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

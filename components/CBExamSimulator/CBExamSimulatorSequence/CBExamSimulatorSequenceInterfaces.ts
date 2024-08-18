import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { CBExerciseWithCorrectness } from "../CBExamSimulatorInterfaces";

export interface CBExamSimulatorSequenceProps {
  exercises: CBExerciseWithMetaData[];
  setExercises: Dispatch<SetStateAction<CBExerciseWithCorrectness[]>>;
  onSequenceComplete: VoidFunction;
  onCancel: VoidFunction;
  beginTime: Dayjs;
}

import { Dispatch, SetStateAction } from "react";
import { CBExamSimulatorState } from "../CBExamSimulatorInterfaces";

export interface CBExamSimulatorHomeProps {
  titleCard: string;
  titleTop: string;
  setExamState: Dispatch<SetStateAction<CBExamSimulatorState>>;
}

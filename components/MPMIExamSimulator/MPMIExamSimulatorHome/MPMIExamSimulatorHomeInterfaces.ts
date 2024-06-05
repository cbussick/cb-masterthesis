import { Dispatch, SetStateAction } from "react";
import { MPMIExamSimulatorState } from "../MPMIExamSimulatorInterfaces";

export interface MPMIExamSimulatorHomeProps {
  titleCard: string;
  titleTop: string;
  setExamState: Dispatch<SetStateAction<MPMIExamSimulatorState>>;
}

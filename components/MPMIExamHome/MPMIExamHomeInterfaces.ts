import { Dispatch, SetStateAction } from "react";
import { MPMIExamSimulatorState } from "../MPMIExamSimulator/MPMIExamSimulatorInterfaces";

export interface MPMIExamHomeProps {
  titleCard: string;
  titleTop: string;
  setExamState: Dispatch<SetStateAction<MPMIExamSimulatorState>>;
}

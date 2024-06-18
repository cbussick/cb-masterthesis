import { CBLoadingButtonProps } from "../CBLoadingButton/CBLoadingButtonInterfaces";

export interface CBDinaHintProps {
  onClick: VoidFunction;
  hint: string;
  isLoading: CBLoadingButtonProps["isLoading"];
  disabled: CBLoadingButtonProps["disabled"];
}

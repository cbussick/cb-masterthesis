import { TextFieldProps } from "@mui/material";

export interface CBTextAreaProps {
  value: TextFieldProps["value"];
  onChange: TextFieldProps["onChange"];
  label: TextFieldProps["label"];
  disabled?: TextFieldProps["disabled"];
  onConfirm: VoidFunction;
  rows?: TextFieldProps["rows"];
}

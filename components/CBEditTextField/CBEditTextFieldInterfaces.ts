import { TextFieldProps } from "@mui/material";

export interface CBEditTextFieldProps {
  label: TextFieldProps["label"];
  value: TextFieldProps["value"];
  onClickEdit?: VoidFunction;
  sx?: TextFieldProps["sx"];
}

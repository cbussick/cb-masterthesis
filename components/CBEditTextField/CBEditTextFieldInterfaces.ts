import { TextFieldProps } from "@mui/material";

export interface CBEditTextFieldProps {
  label: TextFieldProps["label"];
  value: TextFieldProps["value"];
  onClickIcon: () => void;
  sx?: TextFieldProps["sx"];
}

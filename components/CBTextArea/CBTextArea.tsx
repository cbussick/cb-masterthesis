"use client";

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CBTextAreaProps } from "./CBTextAreaInterfaces";

export const CBTextArea = ({
  value,
  onChange,
  label,
  disabled,
  onConfirm,
  rows,
}: CBTextAreaProps): JSX.Element => {
  const [isTextAreaFocused, setTextAreaFocused] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!disabled) {
        const { key, ctrlKey } = event;

        if (isTextAreaFocused && key === "Enter" && ctrlKey) {
          onConfirm();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, isTextAreaFocused, onConfirm]);

  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      multiline
      rows={rows || 5}
      disabled={disabled}
      sx={{ width: 550 }}
      onFocus={() => setTextAreaFocused(true)}
      onBlur={() => setTextAreaFocused(false)}
    />
  );
};

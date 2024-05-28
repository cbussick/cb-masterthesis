"use client";

import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { MPMIMatchingGameSelectProps } from "./MPMIMatchingGameSelectInterfaces";

export const MPMIMatchingGameSelect = ({
  index,
  options,
  setSelectedOptions,
  isCurrentExerciseFinished,
  disabled,
  showError,
  setShowMistakes,
}: MPMIMatchingGameSelectProps): JSX.Element => {
  const [value, setValue] = useState<string>("");

  return (
    <Select
      value={value}
      onChange={(e) => {
        const valueAsNumber = parseInt(e.target.value, 10);

        setValue(e.target.value);
        setSelectedOptions((prev) => {
          const newOptions = [...prev];
          newOptions[index] = valueAsNumber;
          return newOptions;
        });
      }}
      disabled={disabled}
      error={showError}
      onFocus={() => {
        if (showError) {
          setShowMistakes((prev) => {
            const newMistakes = [...prev];
            newMistakes[index] = false;
            return newMistakes;
          });
        }
      }}
      size="small"
      sx={{
        height: 34,
        width: 200,
        "& .MuiOutlinedInput-notchedOutline": {
          borderWidth: isCurrentExerciseFinished ? 3 : 1,
          borderColor: (t) =>
            // eslint-disable-next-line no-nested-ternary
            isCurrentExerciseFinished
              ? showError
                ? `${t.palette.error.main} !important`
                : `${t.palette.success.main} !important`
              : undefined,
        },
      }}
    >
      {options.map((o) => (
        <MenuItem key={o.id} value={o.id}>
          {o.name}
        </MenuItem>
      ))}
    </Select>
  );
};

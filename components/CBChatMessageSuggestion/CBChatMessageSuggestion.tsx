"use client";

import { Chip, Typography } from "@mui/material";
import { CBChatMessageSuggestionProps } from "./CBChatMessageSuggestionInterfaces";

export const CBChatMessageSuggestion = ({
  suggestion,
  onClick,
}: CBChatMessageSuggestionProps): JSX.Element => {
  return (
    <Chip
      label={<Typography variant="body2">{suggestion}</Typography>}
      onClick={() => onClick(suggestion)}
      sx={{
        py: 2.5,
        color: (t) => t.palette.getContrastText(t.palette.secondary.light),
        backgroundColor: (t) => t.palette.secondary.light,
        "&:hover": {
          backgroundColor: (t) => t.palette.secondary.main,
        },
      }}
    />
  );
};

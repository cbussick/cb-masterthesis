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
      color="secondary"
      onClick={() => onClick(suggestion)}
    />
  );
};

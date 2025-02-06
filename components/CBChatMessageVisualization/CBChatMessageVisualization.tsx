"use client";

import { CBChatMessageRole } from "@/data/exercises/CBChatMessage";
import { Stack, Typography } from "@mui/material";
import { CBChatMessageVisualizationProps } from "./CBChatMessageVisualizationInterfaces";

export const CBChatMessageVisualization = ({
  message,
}: CBChatMessageVisualizationProps): JSX.Element => {
  const isAI = message.role === CBChatMessageRole.AI;

  return (
    <Stack
      spacing={1}
      sx={{
        alignSelf: isAI ? "flex-start" : "flex-end",
        bgcolor: (t) => (isAI ? t.palette.grey[50] : t.palette.primary.light),
        color: (t) => (isAI ? undefined : t.palette.primary.contrastText),
        p: 2,
        borderRadius: 3,
        width: "60%",
      }}
    >
      <Typography
        sx={{
          fontWeight: (t) => t.typography.fontWeightBold,
        }}
      >
        {isAI ? "DiNA" : "Du"}
      </Typography>

      <Typography>{message.content}</Typography>
    </Stack>
  );
};

"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";

export const CBChatIsTypingIndicator = (): JSX.Element => {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <CircularProgress size={30} />

      <Typography variant="body2">DiNA schreibt ...</Typography>
    </Stack>
  );
};

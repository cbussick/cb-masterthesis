"use client";

import { CBLogo } from "@/components/CBLogo/CBLogo";
import { CircularProgress, Container, Stack } from "@mui/material";

export const CBLoadingView = (): JSX.Element => {
  return (
    <Stack
      spacing={5}
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: (t) => t.palette.background.default,
      }}
    >
      <Container maxWidth="md">
        <CBLogo style={{ width: "100%" }} />
      </Container>

      <CircularProgress size={80} />
    </Stack>
  );
};

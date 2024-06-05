"use client";

import { MPMILogo } from "@/components/MPMILogo/MPMILogo";
import { CircularProgress, Container, Stack } from "@mui/material";

export const MPMILoadingView = (): JSX.Element => {
  return (
    <Stack
      spacing={5}
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bgcolor={(t) => t.palette.background.default}
    >
      <Container maxWidth="md" sx={{ px: { xs: 5, md: undefined } }}>
        <MPMILogo style={{ width: "100%" }} />
      </Container>

      <CircularProgress size={80} />
    </Stack>
  );
};

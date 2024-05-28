"use client";

import { Container, Stack, Typography } from "@mui/material";
import { MPMILogo } from "../MPMILogo/MPMILogo";

export const MPMIMobileView = (): JSX.Element => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Stack
        height="100%"
        spacing={4}
        justifyContent="center"
        alignItems="center"
        padding={4}
      >
        <MPMILogo style={{ width: "100%" }} />

        <Stack spacing={1} justifyContent="center" alignItems="center">
          <Typography variant="h1" align="center">
            Zu kleiner Bildschirm 💻
          </Typography>

          <Typography align="center">
            DiNAs Lab ist leider nicht für kleine Bildschirme optimiert. Bitte
            schau dir die Website auf einem größeren Bildschirm an.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

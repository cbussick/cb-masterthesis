"use client";

import { CBLogo } from "@/components/CBLogo/CBLogo";
import { Container, Stack, Typography } from "@mui/material";

export const CBMobileView = (): JSX.Element => {
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
        p={4}
      >
        <CBLogo style={{ width: "100%" }} />

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

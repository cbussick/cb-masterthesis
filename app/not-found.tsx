"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBLogo } from "@/components/CBLogo/CBLogo";
import { Button, Container, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack
        height="100%"
        spacing={6}
        alignItems="center"
        justifyContent="center"
      >
        <Container maxWidth="xs">
          <CBLogo style={{ width: "100%" }} />
        </Container>

        <Stack spacing={3} alignItems="center">
          <Typography variant="h1" align="center">
            Hier ist leider nichts 🤔
          </Typography>

          <Typography align="center">
            Irgendetwas ist hier schief gelaufen. Geh am besten zur Homepage
            zurück, indem du den Button unten klickst oder benutze die
            Menüpunkte in der Sidebar links.
          </Typography>

          <Button href="/">Zur Homepage</Button>
        </Stack>
      </Stack>
    </CBContentWrapper>
  );
}

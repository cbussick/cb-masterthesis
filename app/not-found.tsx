"use client";

import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMILogo } from "@/components/MPMILogo/MPMILogo";
import { Button, Container, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack
        height="100%"
        spacing={6}
        alignItems="center"
        justifyContent="center"
      >
        <Container maxWidth="xs">
          <MPMILogo style={{ width: "100%" }} />
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
    </MPMIContentWrapper>
  );
}

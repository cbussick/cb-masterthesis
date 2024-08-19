"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBEmoji } from "@/components/CBEmoji/CBEmoji";
import { CBLogo } from "@/components/CBLogo/CBLogo";
import { CBRoute } from "@/helpers/routes";
import { Button, Container, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack
        spacing={6}
        sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}
      >
        <Container maxWidth="xs">
          <CBLogo style={{ width: "100%" }} />
        </Container>

        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h1" sx={{ textAlign: "center" }}>
              Hier ist leider nichts
            </Typography>

            <CBEmoji emoji="🤔" typographyVariant="h1" />
          </Stack>

          <Typography sx={{ textAlign: "center" }}>
            Irgendetwas ist hier schief gelaufen. Geh am besten zum Dashboard
            zurück, indem du den Button unten klickst oder benutze die
            Menüpunkte in der Sidebar links.
          </Typography>

          <Button href={CBRoute.Home}>Zum Dashboard</Button>
        </Stack>
      </Stack>
    </CBContentWrapper>
  );
}

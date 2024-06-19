"use client";

import { CBRoute, routeMap } from "@/helpers/routes";
import { Button, Container, Stack, Typography } from "@mui/material";
import { CBEmoji } from "../CBEmoji/CBEmoji";
import { CBLogo } from "../CBLogo/CBLogo";

export const CBNoAccessTopicWorldView = (): JSX.Element => {
  return (
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
            Du hast leider keinen Zugriff auf diese Seite
          </Typography>

          <CBEmoji emoji="🔒" typographyVariant="h1" />
        </Stack>

        <Typography sx={{ textAlign: "center" }}>
          Irgendetwas ist hier schief gelaufen. Geh am besten zur Übersicht der
          Themen zurück, indem du den Button unten klickst oder benutze die
          Menüpunkte in der Sidebar links.
        </Typography>

        <Button href={routeMap[CBRoute.Themenwelt].route}>
          Zur Übersicht der Themen
        </Button>
      </Stack>
    </Stack>
  );
};

"use client";

import { Divider, Stack, Typography } from "@mui/material";

export const MPMIDataSecuritySettings = (): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h4">1. Datenschutzerklärung</Typography>

        <Typography variant="body2">
          Hier bei DiNAs Lab ist uns der Schutz deiner persönlichen Daten
          wichtig. Unsere Datenschutzerklärung erklärt im Detail, welche
          Informationen wir sammeln, wie wir sie verwenden und mit wem wir sie
          teilen. Erfahre mehr, indem du unsere Datenschutzerklärung liest.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h4">2. Datensammlung und -verwendung</Typography>

        <Typography variant="body2">
          Wir sammeln Daten, um deine Erfahrung auf DiNAs Lab zu personalisieren
          und unsere Dienstleistungen zu verbessern. Erfahre mehr darüber, wie
          wir deine Informationen nutzen und den Zweck unserer Datensammlung.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h4">3. Sicherheitsmaßnahmen</Typography>

        <Typography variant="body2">
          Deine Sicherheit liegt uns am Herzen. DiNAs Lab setzt fortschrittliche
          Sicherheitsmaßnahmen wie Verschlüsselungstechnologien und
          Zugriffskontrollen ein, um deine Daten zu schützen.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h4">4. Cookies und Tracking</Typography>

        <Typography variant="body2">
          Wir verwenden Cookies und ähnliche Technologien, um dir eine
          optimierte Nutzererfahrung zu bieten. Erfahre, wie du die Verwendung
          von Cookies kontrollieren kannst und welche Arten von Cookies wir
          verwenden.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h4">5. Rechte der Benutzer</Typography>

        <Typography variant="body2">
          Du hast das Recht auf Zugriff, Berichtigung, Löschung und Widerspruch
          bezüglich deiner Daten. Hier erfährst du, wie du diese Rechte ausüben
          kannst.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h4">6. Datensicherheit</Typography>

        <Typography variant="body2">
          Wir setzen auf höchste Standards für Datensicherheit, um
          sicherzustellen, dass deine persönlichen Informationen während der
          Übertragung und Speicherung geschützt sind.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h4">7. Datenweitergabe</Typography>

        <Typography variant="body2">
          Deine Daten werden von uns vertraulich behandelt und nicht an Dritte
          weitergegeben.
        </Typography>
      </Stack>
    </Stack>
  );
};

"use client";

import { Stack, Typography } from "@mui/material";
import { CBProfileImageSelector } from "../CBProfileImageSelector/CBProfileImageSelector";
import { CBSettingsSection } from "./CBSettingsSection/CBSettingsSection";

export const CBAvatarSettings = (): JSX.Element => {
  return (
    <Stack spacing={3}>
      <Typography>
        Hier kannst du deinen Avatar auswählen. Erreiche das nächste Level, um
        mehr Avatare freizuschalten.
      </Typography>

      <CBSettingsSection title="Avatar">
        <CBProfileImageSelector />
      </CBSettingsSection>
    </Stack>
  );
};

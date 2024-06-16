import { Alert, Stack, Typography } from "@mui/material";
import { CBProfileImageSelector } from "../CBProfileImageSelector/CBProfileImageSelector";
import { CBSettingsSection } from "./CBSettingsSection/CBSettingsSection";

export const CBAvatarSettings = (): JSX.Element => {
  return (
    <Stack spacing={3}>
      <Alert severity="info" sx={{ alignItems: "center" }}>
        <Typography>
          Hier kannst du deinen Avatar auswählen. Erreiche das nächste Level, um
          mehr Avatare freizuschalten.
        </Typography>
      </Alert>

      <CBSettingsSection title="Avatar">
        <CBProfileImageSelector />
      </CBSettingsSection>
    </Stack>
  );
};

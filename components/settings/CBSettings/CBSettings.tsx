"use client";

import { Box, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { CBDataSecuritySettings } from "../CBDataSecuritySettings";
import { CBGeneralSettings } from "../CBGeneralSettings";
import { CBNotificationSettings } from "../CBNotificationSettings";
import { CBProfileSettings } from "../CBProfileSettings";
import { CBTabPanel } from "./CBTabPanel";

export const CBSettings = () => {
  const [value, setValue] = useState(0);

  return (
    <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(event: SyntheticEvent, newValue: number) => {
            setValue(newValue);
          }}
        >
          <Tab label="Allgemein" />

          <Tab label="Profil verwalten" />

          <Tab label="Benachrichtigungen" />

          <Tab label="Sicherheit und Datenschutz" />
        </Tabs>
      </Box>

      <CBTabPanel value={value} index={0}>
        <CBGeneralSettings />
      </CBTabPanel>

      <CBTabPanel value={value} index={1}>
        <CBProfileSettings />
      </CBTabPanel>

      <CBTabPanel value={value} index={2}>
        <CBNotificationSettings />
      </CBTabPanel>

      <CBTabPanel value={value} index={3}>
        <CBDataSecuritySettings />
      </CBTabPanel>
    </Stack>
  );
};

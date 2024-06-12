"use client";

import { Box, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { CBDataSecuritySettings } from "../CBDataSecuritySettings";
import { CBGeneralSettings } from "../CBGeneralSettings";
import { CBNotificationSettings } from "../CBNotificationSettings";
import { CBProfileSettings } from "../CBProfileSettings";
import { CBTabPanel } from "./CBTabPanel";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const CBSettings = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack flexGrow="1" sx={{ overflowY: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Allgemein" {...a11yProps(0)} />

          <Tab label="Profil verwalten" {...a11yProps(1)} />

          <Tab label="Benachrichtigungen" {...a11yProps(2)} />

          <Tab label="Sicherheit und Datenschutz" {...a11yProps(3)} />
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

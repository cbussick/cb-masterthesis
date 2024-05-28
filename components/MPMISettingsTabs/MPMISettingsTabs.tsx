"use client";

import { Box, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { MPMIDataSecuritySettings } from "../MPMISettings/MPMIDataSecuritySettings";
import { MPMIGeneralSettings } from "../MPMISettings/MPMIGeneralSettings";
import { MPMINotificationSettings } from "../MPMISettings/MPMINotificationSettings";
import { MPMIProfileSettings } from "../MPMISettings/MPMIProfileSettings";
import { MPMITabPanel } from "./MPMITabPanel";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const MPMISettingsTabs = () => {
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

      <MPMITabPanel value={value} index={0}>
        <MPMIGeneralSettings />
      </MPMITabPanel>

      <MPMITabPanel value={value} index={1}>
        <MPMIProfileSettings />
      </MPMITabPanel>

      <MPMITabPanel value={value} index={2}>
        <MPMINotificationSettings />
      </MPMITabPanel>

      <MPMITabPanel value={value} index={3}>
        <MPMIDataSecuritySettings />
      </MPMITabPanel>
    </Stack>
  );
};

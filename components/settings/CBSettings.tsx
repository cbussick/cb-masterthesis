"use client";

import { CBTabPanel } from "@/components/CBTabPanel/CBTabPanel";
import { NotificationsNoneRounded, PersonRounded } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { CBNotificationSettings } from "./CBNotificationSettings";
import { CBProfileSettings } from "./CBProfileSettings";

export const CBSettings = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: (t) => t.palette.divider }}>
        <Tabs
          value={value}
          onChange={(event: SyntheticEvent, newValue: number) => {
            setValue(newValue);
          }}
        >
          <Tab label="Profil verwalten" icon={<PersonRounded />} />

          <Tab label="Benachrichtigungen" icon={<NotificationsNoneRounded />} />
        </Tabs>
      </Box>

      <CBTabPanel value={value} index={0}>
        <CBProfileSettings />
      </CBTabPanel>

      <CBTabPanel value={value} index={1}>
        <CBNotificationSettings />
      </CBTabPanel>
    </Stack>
  );
};
